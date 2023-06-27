import db from "@src/config/db";
import validateQuery from "@src/lib/query-validator.lib";
import { Request, Response } from "express";
import {
  DeleteOrderRequest,
  ShowOrderRequest,
  StoreOrderRequest,
  UpdateOrderRequest,
} from "@src/requests";

const index = async (request: Request, response: Response) => {
  const { search, sort, page } = validateQuery(request.query);

  const orders = await db.order.findMany({
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
    data: orders,
    count: await db.order.count(),
    page: page ?? 1,
    limit: 8,
  });
};

const show = async (request: ShowOrderRequest, response: Response) => {
  const { xId: id } = request.body;

  const order = await db.order.findUnique({
    where: {
      id: Number(id),
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

  return response.json(order);
};

const store = async (request: StoreOrderRequest, response: Response) => {
  const { products, userId } = request.body;

  const productsPrices = await db.product.findMany({
    where: {
      OR: products.map(({ id }) => ({
        id,
      })),
    },
    select: {
      id: true,
      price: true,
    },
  });

  const order = await db.order.create({
    data: {
      userId,
      items: {
        createMany: {
          data: products.map(({ id, quantity }) => ({
            productId: id,
            price: productsPrices.find((product) => product.id === id)!.price,
            quantity,
          })),
        },
      },
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

  return response.status(201).json(order);
};

const update = async (request: UpdateOrderRequest, response: Response) => {
  const { xId: id, userId, products } = request.body;

  await db.order.update({
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

const destroy = async (request: DeleteOrderRequest, response: Response) => {
  const { xId: id } = request.body;

  await db.order.delete({
    where: {
      id,
    },
  });

  return response.sendStatus(204);
};

export const orderController = {
  index,
  show,
  store,
  update,
  destroy,
};
