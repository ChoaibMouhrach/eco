import { paginationBuilder, projectionBuilder, queryBuilder, randomId, sortingBuilder } from "../helpers/controllersHelper";
import { Request, Response } from "express";
import Category from "../models/Category";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";
import { join } from "path";
import { Types } from "mongoose";
import { ROOT_DIR } from "../config/config";

/* The root directory for categories images */
const UPLOADS_DIRECTORY: string = `uploads/categories/categories_images/`

/* For getting categories documents */
export const index = async (request: Request<{}, {}, {}, Record<string, string | undefined>>, response: Response) => {

  const { sort, fields, search, order, page, trash } = request.query

  let query = queryBuilder(search, ["name"]);
  const projection = projectionBuilder(fields, ["name", "image", "_id", "createdAt", "updatedAt", "deletedAt"]);
  const sortingCriteria = sortingBuilder(sort, order === "desc" ? "desc" : "asc", ["name", "_id", "createdAt", "updatedAt", "deletedAt"])
  const pagination = paginationBuilder(page)

  query.deletedAt = null

  if (trash === "true") {
    query.deletedAt = { $ne: null }
  }

  const categories = await Category.find(query, projection).sort(sortingCriteria).skip(pagination.skip).limit(pagination.limit);

  return response.json({
    data: categories,
    limit: pagination.limit,
    skip: pagination.skip,
    count: await Category.count(),
    page: Number(page) ? Number(page) : 1
  })
}

/* For creating a new category documents */
export const store = async (request: Request<{}, {}, Record<string, string | undefined>>, response: Response) => {

  const { name } = request.body;

  if (!name) {
    return response.status(400).json({ errors: [{ path: ["name"], message: "Required" }] })
  }

  if (await Category.exists({ name })) {
    return response.status(400).json({ message: "Category already exist" })
  }

  const storingData: Record<string, string> = { name };

  if (request.file) {

    if (!existsSync(join(ROOT_DIR, UPLOADS_DIRECTORY))) {
      mkdirSync(join(ROOT_DIR, UPLOADS_DIRECTORY), { recursive: true })
    }

    storingData.image = join(UPLOADS_DIRECTORY, `${randomId()} - ${request.file.originalname}`)
    writeFileSync(join(ROOT_DIR, storingData.image), request.file.buffer)
  }

  const category = new Category(storingData);

  await category.save()

  return response.status(201).json(category)
}

/* For updating category documents */
export const update = async (request: Request<Record<string, string>, {}, Record<string, string | undefined>>, response: Response) => {

  const { id } = request.params

  if (!Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: "The provided id is invalid" })
  }

  const category = await Category.findOne({ _id: id })

  if (!category || category.deletedAt) {
    return response.status(404).json({ message: "Category not found" })
  }

  const updatingData: Record<string, string> = {}

  if (request.body.name) {
    updatingData["name"] = request.body.name
  }

  if (request.file) {

    if (category.image) {

      if (!existsSync(join(ROOT_DIR, UPLOADS_DIRECTORY))) {
        mkdirSync(join(ROOT_DIR, UPLOADS_DIRECTORY), { recursive: true })
      }

      try {
        unlinkSync(join(ROOT_DIR, category.image))
      } catch (err) { }

    }

    updatingData.image = join(UPLOADS_DIRECTORY, `${randomId()} - ${request.file.originalname}`)

    writeFileSync(updatingData.image, request.file.buffer)

  }

  if (!updatingData.image && !updatingData.name) {
    return response.status(400).json({ message: "Nothing to update" })
  }

  try {
    await Category.updateOne({ _id: id }, updatingData);
  } catch (err) {
    return response.status(400).json({ errors: [{ path: ["name"], "message": "Name already exists" }] })
  }

  return response.sendStatus(204)
}

/* For deleting category documents */
export const destroy = async (request: Request<Record<string, string>>, response: Response) => {
  const { id } = request.params

  if (!Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: "The provided id is invalid" })
  }

  const category = await Category.findOne({ _id: id });

  if (category && !category.deletedAt) {
    await category.softDelete();

    return response.sendStatus(204)
  }

  return response.status(404).json({ message: "Category not found" })
}
