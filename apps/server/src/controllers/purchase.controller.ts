import db from "@src/config/db";
import validateQuery from "@src/lib/query-validator.lib";
import { Request, Response } from "express";

const index = async (request: Request, response: Response) => {
  const { search, sort, page } = validateQuery(request.query);

  const purchases = await db.purchase.findMany({
    where: {
      OR: [
        {
          user: {
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
                address: {
                  contains: search,
                },
              },
            ],
          },
        },
        {
          items: {
            some: {
              product: {
                name: {
                  contains: search,
                },
                description: {
                  contains: search,
                },
              },
            },
          },
        },
      ],
    },
    orderBy: sort,
    skip: page ? (page - 1) * 8 : 0,
    take: 8,
  });

  return response.json({
    data: purchases,
    count: await db.order.count(),
    page: page ?? 1,
    limit: 8,
  });
};

export const purchaseController = {
  index,
};
