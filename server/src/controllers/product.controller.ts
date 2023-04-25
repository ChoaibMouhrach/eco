import { Response, Request } from "express"
import { paginate, paginationBuilder, projectionBuilder, queryBuilder, sortingBuilder } from "../utils/builder";
import Product from "../models/Product";
import { StoreProductRequest } from "../requests/product/store.request";
import { publicStore } from "../utils/storage";
import { isValidObjectId } from "mongoose";

export const index = async (request: Request<{}, {}, {}, Record<string, string | undefined>>, response: Response) => {
  const {
    search,
    sort,
    order,
    fields,
    page,
    trash
  } = request.query

  /* Search */
  let query = queryBuilder(search, [
    "name",
    "description",
    "shortDescription"
  ]);

  if (trash) {
    query["deletedAt"] = { $ne: null }
  } else {
    query["deletedAt"] = null
  }

  /* Fields */
  let projection = projectionBuilder(fields, [
    "name",
    "images",
    "price",
    "discount",
    "shortDescription",
    "description"
  ])

  /* Sorting */
  const sortingCriteria = sortingBuilder(sort, order === "desc" ? "desc" : "asc", [
    "name",
    "discount",
    "price"
  ]);

  /* Pagination */
  const pagination = paginationBuilder(page);

  /* Extract products  */
  let products = await Product.find(query, projection)
    .sort(sortingCriteria)
    .skip(pagination.skip)
    .limit(pagination.limit)

  /* return paginated products */
  return response.json(paginate(products, pagination, await Product.count(), page))
}

export const show = (_request: Request, _response: Response) => {

}

export const store = async (request: StoreProductRequest, response: Response) => {

  const {
    name,
    price,
    discount,
    inStock,
    shortDescription,
    description,
    categories
  } = request.body

  /* files */
  let files = request.files as Express.Multer.File[]

  /* images */
  let images: string[] = []

  /* store the files */
  for (let file of files) {
    images.push(
      publicStore(file, "products") as string
    )
  }

  /* create the product */
  const product = new Product({
    name,
    price,
    discount,
    inStock,
    shortDescription,
    description,
    categories,
    images
  })

  /* save the product */
  await product.save()

  /* return the product */
  return response.json(product)
}

export const update = (_request: Request, _response: Response) => {

}

export const destroy = async (request: Request, response: Response) => {

  const { id } = request.params as { id: string }

  if (!isValidObjectId(id)) {
    return response.status(400).json({
      message: "Id is invalid"
    })
  }

  const product = await Product.findOne({ _id: id })

  if (!product || (product && product.deletedAt)) {
    return response.sendStatus(404)
  }

  product.deletedAt = new Date()

  await product.save()

  return response.sendStatus(204)

}

