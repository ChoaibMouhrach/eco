import db from "@src/config/db";
import validateQuery from "@src/lib/query-validator.lib";
import { Request, Response } from "express";

const index = async (request: Request, response: Response) => {
  const { search, page, sort } = validateQuery(request.query);

  const users = await db.user.findMany({
    where: {
      OR: [
        {
          firstName: {
            contains: search,
          },
        },
        {
          lastName: {
            contains: search,
          },
        },
        {
          email: {
            contains: search,
          },
        },
        {
          phone: {
            contains: search,
          },
        },
        {
          address: {
            contains: search,
          },
        },
      ],
    },
    orderBy: sort,
    skip: page ? (page - 1) * 8 : 0,
    take: 8,
  });

  return response.json({
    data: users,
    count: await db.user.count(),
    page: page ?? 1,
    limit: 8,
  });
};

export const userController = {
  index,
};
