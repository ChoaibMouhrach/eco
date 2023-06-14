import db from "@src/config/db";
import validateQuery from "@src/lib/query-validator.lib";
import { Request, Response } from "express";

const index = async (request: Request, response: Response) => {
  const { search, sort, page } = validateQuery(request.query);

  const products = await db.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
          },
        },
        {
          description: {
            contains: search,
          },
        },
        {
          category: {
            name: {
              contains: search,
            },
          },
        },
        {
          tags: {
            some: {
              name: {
                contains: search,
              },
            },
          },
        },
        {
          unit: {
            name: {
              contains: search,
            },
          },
        },
      ],
    },
    orderBy: sort,
    skip: page ? (page - 1) * 8 : 1,
    take: 8,
  });

  return response.json({
    data: products,
    count: await db.product.count(),
    page: page ?? 1,
    limit: 8,
  });
};

export const productController = {
  index,
};
