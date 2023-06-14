import db from "@src/config/db";
import validateQuery from "@src/lib/query-validator.lib";
import { Request, Response } from "express";

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

const store = () => {};

const update = () => {};

const destroy = () => {};

export const categoryController = {
  index,
  store,
  update,
  destroy,
};
