import db from "@src/config/db";
import validateQuery from "@src/lib/query-validator.lib";
import { Request, Response } from "express";
import {
  DeleteUserRequest,
  ShowUserRequest,
  StoreUserRequest,
  UpdateUserRequest,
} from "@src/requests";
import { Prisma } from "@prisma/client";

const index = async (request: Request, response: Response) => {
  const query = validateQuery(request.query);

  if (query.search) {
    query.search = query.search.trim();
  }

  const where: Prisma.UserWhereInput | undefined = query.search
    ? {
        OR: [
          {
            firstName: {
              contains: query.search,
            },
          },
          {
            lastName: {
              contains: query.search,
            },
          },
          {
            email: {
              contains: query.search,
            },
          },
          {
            phone: {
              contains: query.search,
            },
          },
          {
            address: {
              contains: query.search,
            },
          },
        ],
      }
    : undefined;

  const users = await db.user.findMany({
    where,
    include: {
      role: true,
    },
    orderBy: query.sort,
    skip: query.page ? (query.page - 1) * 8 : 0,
    take: 8,
  });

  const count = await db.user.count({
    where,
  });

  return response.json({
    data: users,
    count,
    page: query.page ?? 1,
    limit: 8,
  });
};

const show = async (request: ShowUserRequest, response: Response) => {
  const { xId } = request.body;

  const user = await db.user.findUnique({
    where: {
      id: xId,
    },
  });

  return response.json(user);
};

const store = async (request: StoreUserRequest, response: Response) => {
  const user = await db.user.create({
    data: request.body,
  });

  return response.status(201).json(user);
};

const update = async (request: UpdateUserRequest, response: Response) => {
  const { xId, firstName, lastName, email, phone, address, roleId } =
    request.body;

  await db.user.update({
    where: {
      id: xId,
    },
    data: {
      firstName,
      lastName,
      email,
      phone,
      address,
      roleId,
    },
  });

  return response.sendStatus(204);
};

const destroy = async (request: DeleteUserRequest, response: Response) => {
  const { xId } = request.body;

  await new Promise((res) => {
    setTimeout(() => {
      res("");
    }, 5000);
  });

  await db.user.delete({
    where: {
      id: xId,
    },
  });

  return response.sendStatus(204);
};

export const userController = {
  index,
  show,
  store,
  update,
  destroy,
};
