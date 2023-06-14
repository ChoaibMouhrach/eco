import db from "@src/config/db";
import validateQuery from "@src/lib/query-validator.lib";
import { StoreCategoryRequest, UpdateCategoryRequest } from "@src/requests";
import { Request, Response } from "express";
import { DeleteCategoryRequest } from "@src/requests/delete-category.request";

const index = async (request: Request, response: Response) => {
  const { search, sort, page } = validateQuery(request.query);

  const categories = await db.category.findMany({
    where: {
      name: {
        contains: search,
      },
    },
    orderBy: sort,
    skip: page ? (page - 1) * 8 : 0,
    take: 8,
  });

  return response.json({
    data: categories,
    count: await db.category.count(),
    page: page ?? 1,
    limit: 8,
  });
};

const store = async (request: StoreCategoryRequest, response: Response) => {
  const {
    name
  } = request.body

  const category = await db.category.create({
    data: {
      name
    }
  })

  return response.status(204).json(category)
};

const update = async (request: UpdateCategoryRequest, response: Response) => {
  const {
    name,
    xId
  } = request.body

  await db.category.update({
    where: {
      id: xId
    },
    data: {
      name
    }
  })

  return response.sendStatus(204);
};

const destroy = async (request: DeleteCategoryRequest, response: Response) => {

  const {
    xId
  } = request.body

  await db.category.delete({
    where: {
      id: xId
    }
  })

  return response.json()
};

export const categoryController = {
  index,
  store,
  update,
  destroy,
};
