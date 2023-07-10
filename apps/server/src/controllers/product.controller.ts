import { Prisma } from "@prisma/client";
import config from "@src/config/config";
import db from "@src/config/db";
import { BadRequestException } from "@src/exceptions";
import validateQuery from "@src/lib/query-validator.lib";
import { storeFile } from "@src/lib/storage.lib";
import {
  DeleteProductRequest,
  ShowProductRequest,
  StoreProductRequest,
  UpdateProductRequest,
} from "@src/requests";
import { Request, Response } from "express";
import { unlinkSync } from "fs";
import { join } from "path";

const index = async (request: Request, response: Response) => {
  const { search, sort, price, page } = validateQuery(request.query);

  const where: Prisma.ProductWhereInput = {
    OR: search
      ? [
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
        ]
      : undefined,
    price: price
      ? {
          gte: price[0],
          lte: price[1],
        }
      : undefined,
  };

  const products = await db.product.findMany({
    where,
    include: {
      images: true,
      tags: true,
      category: true,
      unit: true,
    },
    orderBy: sort,
    skip: page ? (page - 1) * 8 : 0,
    take: 8,
  });

  return response.json({
    data: products,
    count: await db.product.count({ where }),
    page: page ?? 1,
    limit: 8,
  });
};

const show = async (request: ShowProductRequest, response: Response) => {
  const { xId } = request.body;

  const product = await db.product.findUnique({
    where: {
      id: xId,
    },
    include: {
      tags: true,
      category: true,
      unit: true,
      images: true,
    },
  });

  return response.json(product);
};

const store = async (request: StoreProductRequest, response: Response) => {
  const { name, description, price, quantity, categoryId, unitId, tags } =
    request.body;

  const { files } = request;

  if (!files || !(files instanceof Array) || !files.length) {
    throw new BadRequestException([{ path: ["images"], message: "Required" }]);
  }

  const images: string[] = [];

  files.forEach((file) => {
    images.push(storeFile(file.originalname, file.buffer));
  });

  const product = await db.product.create({
    data: {
      name,
      description,
      price,
      quantity,
      categoryId,
      unitId,
      images: {
        create: images.map((image: string) => ({
          path: image,
        })),
      },
      tags: {
        connectOrCreate: tags.map((tag: string) => ({
          where: {
            name: tag,
          },
          create: {
            name: tag,
          },
        })),
      },
    },
    include: {
      tags: true,
      category: true,
      unit: true,
    },
  });

  return response.status(201).json(product);
};

const update = async (request: UpdateProductRequest, response: Response) => {
  const { xId, name, description, price, quantity, unitId, categoryId, tags } =
    request.body;

  if (request.files && request.files instanceof Array && request.files.length) {
    const product = (await db.product.findUnique({
      where: {
        id: xId,
      },
      include: {
        images: true,
      },
    }))!;

    product?.images.forEach((image) => {
      unlinkSync(join(config.ROOT_DIR, image.path));
    });
  }

  await db.product.update({
    where: {
      id: xId,
    },
    data: {
      name,
      description,
      price,
      quantity,
      unitId,
      categoryId,
      tags: {
        set: [],
        connectOrCreate: tags?.map((tag) => ({
          where: {
            name: tag,
          },
          create: {
            name: tag,
          },
        })),
      },
      images:
        request.files && request.files instanceof Array && request.files.length
          ? {
              deleteMany: {},
              createMany: {
                data: request.files.map((file) => ({
                  path: storeFile(file.originalname, file.buffer),
                })),
              },
            }
          : undefined,
    },
  });

  return response.sendStatus(204);
};

const destroy = async (request: DeleteProductRequest, response: Response) => {
  const { xId } = request.body;

  await db.product.delete({
    where: {
      id: xId,
    },
  });

  return response.sendStatus(204);
};

export const productController = {
  index,
  show,
  store,
  update,
  destroy,
};
