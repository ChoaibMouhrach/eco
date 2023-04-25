import { Response, Request } from "express"
import { paginate, paginationBuilder, projectionBuilder, queryBuilder, sortingBuilder } from "../utils/builder";
import Product from "../models/Product";
import { StoreProductRequest } from "../requests/product/store.request";
import { publicStore } from "../utils/storage";
import { isValidObjectId } from "mongoose";
import { UpdateProductRequest } from "../requests/product/update.request";
import Category from "../models/Category";

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

export const show = async (request: Request, response: Response) => {
  /* extract the id */
  const { id } = request.params;

  /* checking if the id is valid */
  if (!isValidObjectId(id)) {
    return response.status(400).json({
      message: "Id is invalid"
    })
  }

  /* extracting the fields from the query params */
  const { fields } = request.query as Record<string, string | undefined>

  /* Creating the projection */
  const projection = projectionBuilder(fields, ["name", "discount", "price", "categories", "description", "shortDescription", "instock", "images"])

  /* Retrieve product */
  const product = await Product.findOne({ _id: id }, projection)

  /* check if the product does exists and its not soft deleted */
  if (!product || (product && product.deletedAt)) {
    return response.sendStatus(404)
  }

  /* setting the response body */
  return response.json(product)
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

export const update = async (request: UpdateProductRequest, response: Response) => {

  const { id } = request.params as { id: string }

  const product = await Product.findOne({ _id: id })

  if (!product || (product && product.deletedAt)) {
    return response.sendStatus(404)
  }

  product.updateOne(request.body)

  await product.save()

  return response.json(product)
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

