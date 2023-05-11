import { Response, Request } from 'express';
import { Project, Search, Sort, build, paginate, projectionBuilder } from '../utils/builder';
import Product from '../models/Product';
import { StoreProductRequest } from '../requests/product/store.request';
import { publicStore } from '../utils/storage';
import { PipelineStage, isValidObjectId } from 'mongoose';
import { UpdateProductRequest } from '../requests/product/update.request';
import { BadRequestException, NotFoundException } from '../common';

export const index = async (request: Request, response: Response) => {
  /* sorting stage */
  const sort: Sort = {
    value: typeof request.query.sort === 'string' ? request.query.sort : undefined,
    fields: ['name', 'price', 'discount'],
  };

  /* projection stage */
  const project: Project = {
    value: typeof request.query.project === 'string' ? request.query.project : undefined,
    fields: {
      default: {
        name: true,
        price: true,
        discount: true,
        inStock: true,
        description: true,
        shortDescription: true,
      },
      alt: {
        categories: {
          name: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      },
    },
  };

  /* searching stage */
  const search: Search = {
    value: typeof request.query.search === 'string' ? request.query.search : undefined,
    trash: typeof request.query.trash === 'string' ? request.query.trash : undefined,
    fields: ['name', 'description', 'shortDescription', 'categories.name'],
  };

  /* page for pagination */
  const page = typeof request.query.page === 'string' ? request.query.page : undefined;

  /* relationship with categories collection */
  const defaultPipeLineStage: PipelineStage[] = [
    {
      $lookup: {
        from: 'categories',
        localField: 'categories',
        foreignField: '_id',
        as: 'categories',
      },
    },
  ];

  /* build the query */
  const query = build({ search, project, sort, page }, defaultPipeLineStage);

  /* retrieving products */
  const products = await Product.aggregate(query);

  const responseBody = await paginate(products, page, Product, search.trash);

  return response.json(responseBody);
};

export const show = async (request: Request, response: Response) => {
  /* extract the id */
  const { id } = request.params;

  /* checking if the id is valid */
  if (!isValidObjectId(id)) {
    throw new BadRequestException('Id is invalid');
  }

  /* data */
  const data: Project = {
    value: typeof request.query.project === 'string' ? request.query.project : undefined,
    fields: {
      default: {
        name: true,
        description: true,
        shortDescription: true,
        'categories.name': true,
      },
      alt: {
        categories: {
          name: true,
          image: true,
        },
      },
    },
  };

  /* Creating the projection */
  const projection = projectionBuilder(data);

  /* Retrieve product */
  const product = await Product.findOne({ _id: id }, projection);

  /* check if the product does exists and its not soft deleted */
  if (!product || (product && product.deletedAt)) {
    throw new NotFoundException('Product does not exists');
  }

  /* setting the response body */
  return response.json(product);
};

export const store = async (request: StoreProductRequest, response: Response) => {
  const { name, price, discount, inStock, shortDescription, description, categories } =
    request.body;

  /* files */
  const files = request.files as Express.Multer.File[];

  /* images */
  const images: string[] = [];

  /* store the files */
  for (const file of files) {
    images.push(publicStore(file, 'products') as string);
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
    images,
  });

  /* save the product */
  await product.save();

  /* return the product */
  return response.json(product);
};

export const update = async (request: UpdateProductRequest, response: Response) => {
  const { id } = request.params as { id: string };

  const body = request.body;

  if (!isValidObjectId(id)) {
    throw new BadRequestException('Invalid id');
  }

  const product = await Product.findOne({ _id: id });

  if (!product || (product && product.deletedAt)) {
    throw new NotFoundException('Product not found');
  }

  const images: string[] = [];

  if (request.files) {
    const files = request.files as Express.Multer.File[];

    for (const file of files) {
      images.push(publicStore(file, 'products') as string);
    }
  }

  await Product.findOneAndUpdate(
    { _id: product.id },
    {
      ...body,
      images: images.length ? images : undefined,
    },
  );

  return response.json({
    ...product.toObject(),
    ...body,
    images: images.length ? images : undefined,
  });
};

export const destroy = async (request: Request, response: Response) => {
  const { id } = request.params as { id: string };

  if (!isValidObjectId(id)) {
    throw new BadRequestException('Id is invalid');
  }

  const product = await Product.findOne({ _id: id });

  if (!product) {
    throw new NotFoundException('Product not found');
  }

  if (product.deletedAt) {
    await product.deleteOne();
  } else {
    await product.softDelete();
  }

  return response.sendStatus(204);
};
