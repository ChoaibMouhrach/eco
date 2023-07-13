import { Prisma } from "@prisma/client";
import db from "@src/config/db";
import validateQuery from "@src/lib/query-validator.lib";
import {
  DeleteCategoryRequest,
  ShowCategoryRequest,
  StoreCategoryRequest,
  UpdateCategoryRequest,
} from "@src/requests";
import { Request, Response } from "express";

const index = async (request: Request, response: Response) => {
  const { search, sort, page } = validateQuery(request.query);

  const where: Prisma.CategoryWhereInput = {
    name: {
      contains: search,
    },
  };

  const categories = await db.category.findMany({
    where,
    orderBy: sort,
    skip: page ? (page - 1) * 8 : 0,
    take: 8,
  });

  const count = await db.category.count({
    where,
  });

  return response.json({
    data: categories,
    count,
    page: page ?? 1,
    limit: 8,
  });
};

const show = async (request: ShowCategoryRequest, response: Response) => {
  const { xId: id } = request.body;

  const category = await db.category.findUnique({
    where: {
      id,
    },
  });

  return response.status(200).json(category);
};

const store = async (request: StoreCategoryRequest, response: Response) => {
  const { name } = request.body;

  const category = await db.category.create({
    data: {
      name,
    },
  });

  return response.status(201).json(category);
};

const update = async (request: UpdateCategoryRequest, response: Response) => {
  const { name, xId } = request.body;

  await db.category.update({
    where: {
      id: xId,
    },
    data: {
      name,
    },
  });

  return response.sendStatus(204);
};

const destroy = async (request: DeleteCategoryRequest, response: Response) => {
  const { xId } = request.body;

  await db.category.delete({
    where: {
      id: xId,
    },
  });

  return response.sendStatus(204);
};

export const categoryController = {
  index,
  show,
  store,
  update,
  destroy,
};
