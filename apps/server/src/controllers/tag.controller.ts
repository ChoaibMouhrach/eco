import db from "@src/config/db";
import validateQuery from "@src/lib/query-validator.lib";
import { Request, Response } from "express";

const index = async (request: Request, response: Response) => {
  const { search, page, sort } = validateQuery(request.query);

  const tags = await db.tag.findMany({
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
    data: tags,
    count: await db.tag.count(),
    limit: 8,
    page: page ?? 1,
  });
};

export const tagController = {
  index,
};
