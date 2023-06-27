import db from "@src/config/db";
import validateQuery from "@src/lib/query-validator.lib";
import {
  DeletePurchaseRequest,
  ShowPurchaseRequest,
  StorePurchaseRequest,
  UpdatePurchaseRequest,
} from "@src/requests";
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

const show = async (request: ShowPurchaseRequest, response: Response) => {
  const { xId: id } = request.body;

  const purchase = await db.purchase.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return response.json(purchase);
};

const store = async (request: StorePurchaseRequest, response: Response) => {
  const { userId, products } = request.body;

  const productInstances = await db.product.findMany({
    where: {
      OR: products.map((product) => ({
        id: product.id,
      })),
    },
  });

  const purchase = await db.purchase.create({
    data: {
      userId,
      items: {
        createMany: {
          data: productInstances.map((product) => ({
            productId: product.id,
            quantity: products.find((p) => product.id === p.id)!.quantity,
            price: product.price,
          })),
        },
      },
    },
  });

  return response.status(201).json(purchase);
};

const update = async (request: UpdatePurchaseRequest, response: Response) => {
  const { xId: id, userId, products } = request.body;

  await db.purchase.update({
    where: {
      id,
    },
    data: {
      userId,
      items: products
        ? {
            deleteMany: {},
            createMany: {
              data: (
                await db.product.findMany({
                  where: {
                    OR: products.map((product) => ({ id: product.id })),
                  },
                })
              ).map((product) => ({
                productId: product.id,
                price: product.price,
                quantity: products.find((p) => product.id === p.id)!.quantity,
              })),
            },
          }
        : undefined,
    },
  });

  return response.sendStatus(204);
};

const destroy = async (request: DeletePurchaseRequest, response: Response) => {
  const { xId: id } = request.body;

  await db.purchase.delete({
    where: {
      id,
    },
  });

  return response.sendStatus(204);
};

export const purchaseController = {
  index,
  show,
  store,
  update,
  destroy,
};
