import { paginate, paginationBuilder, projectionBuilder, queryBuilder, sortingBuilder } from "../utils/builder";
import { Request, Response } from "express";
import Category from "../models/Category";
import { Types } from "mongoose";
import { publicDestroy, publicStore } from "../utils/storage";
import { StoreRequest } from "../requests/category/store.request";
import { UpdateRequest } from "../requests/category/update.request";
import { DeleteReqeust } from "../requests/category/delete.request";

/* The root directory for categories images */
const IMAGES_DIRECTORY: string = "/categories/categories_images/";

/* For getting categories documents */
export const index = async (request: Request<{}, {}, {}, Record<string, string | undefined>>, response: Response) => {
  const { sort, fields, search, order, page, trash } = request.query;

  let query = queryBuilder(search, ["name"]);
  const projection = projectionBuilder(fields, ["name", "image", "_id"]);
  const sortingCriteria = sortingBuilder(sort, order === "desc" ? "desc" : "asc", ["name"]);
  const pagination = paginationBuilder(page);

  query.deletedAt = null;

  if (trash === "true") {
    query.deletedAt = { $ne: null };
  }

  const categories = await Category.find(query, projection)
    .sort(sortingCriteria)
    .skip(pagination.skip)
    .limit(pagination.limit);

  return response.json(paginate(categories, pagination, await Category.count(), page));
};

/* For creating a new category documents */
export const store = async (request: StoreRequest, response: Response) => {
  const { name } = request.body;

  if (await Category.exists({ name })) {
    return response.status(400).json({ message: "Category already exist" });
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
    return response.status(400).json({ message: "The provided id is invalid" });
  }

  const category = await Category.findOne({ _id: id });

  if (!category || category.deletedAt) {
    return response.status(404).json({ message: "Category not found" });
  }

  const updatingData: Record<string, string | undefined> = {};

  if (request.body.name) {
    updatingData["name"] = request.body.name;
  }

  if (request.file) publicDestroy(category.image);
  updatingData.image = publicStore(request.file, IMAGES_DIRECTORY);

  if (!updatingData.image && !updatingData.name) {
    return response.status(400).json({ message: "Nothing to update" });
  }

  try {
    await Category.updateOne({ _id: id }, updatingData);
  } catch (err) {
    return response.status(400).json({ errors: [{ path: ["name"], message: "Name already exists" }] });
  }

  return response.sendStatus(204);
};

/* For deleting category documents */
export const destroy = async (request: DeleteReqeust, response: Response) => {
  const { id } = request.params;

  if (!Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: "The provided id is invalid" });
  }

  const category = await Category.findOne({ _id: id });

  if (category && !category.deletedAt) {
    await category.softDelete();

    return response.sendStatus(204);
  }

  return response.status(404).json({ message: "Category not found" });
};
