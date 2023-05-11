import { Project, Search, Sort, build, paginate } from '../utils/builder';
import { Request, Response } from 'express';
import Category from '../models/Category';
import { Types } from 'mongoose';
import { publicDestroy, publicStore } from '../utils/storage';
import { StoreRequest } from '../requests/category/store.request';
import { UpdateRequest } from '../requests/category/update.request';
import { DeleteReqeust } from '../requests/category/delete.request';
import { BadRequestException, ConflictException, NotFoundException } from '../common';

/* The root directory for categories images */
const IMAGES_DIRECTORY = '/categories/categories_images/';

/* For getting categories documents */
export const index = async (request: Request, response: Response) => {
  const page = typeof request.query.page === 'string' ? request.query.page : undefined;

  const search: Search = {
    value: typeof request.query.search === 'string' ? request.query.search : undefined,
    trash: typeof request.query.trash === 'string' ? request.query.trash : undefined,
    fields: ['name'],
  };

  const project: Project = {
    value: typeof request.query.project === 'string' ? request.query.project : undefined,
    fields: {
      default: {
        name: true,
      },
    },
  };

  const sort: Sort = {
    value: typeof request.query.sort === 'string' ? request.query.sort : undefined,
    fields: ['name'],
  };

  const query = build({ search, sort, project, page });

  const categories = await Category.aggregate(query);

  const responseBody = await paginate(categories, page, Category, search.trash);

  return response.json(responseBody);
};

/* For creating a new category documents */
export const store = async (request: StoreRequest, response: Response) => {
  const { name } = request.body;

  if (await Category.exists({ name })) {
    throw new ConflictException('Category already exist');
  }

  const storingData: Record<string, string | undefined> = { name };

  storingData.image = publicStore(request.file, IMAGES_DIRECTORY);

  const category = new Category(storingData);

  await category.save();

  return response.status(201).json(category);
};

/* For updating category documents */
export const update = async (request: UpdateRequest, response: Response) => {
  const { id } = request.params;

  if (!Types.ObjectId.isValid(id)) {
    throw new BadRequestException('The provided id is invalid');
  }

  const category = await Category.findOne({ _id: id });

  if (!category || category.deletedAt) {
    throw new NotFoundException('Category Not Found');
  }

  const updatingData: Record<string, string | undefined> = {};

  if (request.body.name) {
    updatingData['name'] = request.body.name;
  }

  if (request.file) publicDestroy(category.image);
  updatingData.image = publicStore(request.file, IMAGES_DIRECTORY);

  if (!updatingData.image && !updatingData.name) {
    throw new BadRequestException('Nothing to update');
  }

  try {
    await Category.updateOne({ _id: id }, updatingData);
  } catch (err) {
    throw new ConflictException('Name already exists');
  }

  return response.sendStatus(204);
};

/* For deleting category documents */
export const destroy = async (request: DeleteReqeust, response: Response) => {
  const { id } = request.params;

  if (!Types.ObjectId.isValid(id)) {
    throw new BadRequestException('The provided id is invalid');
  }

  const category = await Category.findOne({ _id: id });

  if (!category) {
    throw new NotFoundException('Category Not Found');
  }

  if (category.deletedAt) {
    await category.deleteOne();
  } else {
    await category.softDelete();
  }

  return response.sendStatus(204);
};
