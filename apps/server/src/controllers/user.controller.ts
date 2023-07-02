import db from "@src/config/db";
import validateQuery from "@src/lib/query-validator.lib";
import { Request, Response } from "express";
import {
  DeleteUserRequest,
  ShowUserRequest,
  StoreUserRequest,
  UpdateUserRequest,
} from "@src/requests";

const index = async (request: Request, response: Response) => {
  const { search, page, sort } = validateQuery(request.query);

  const users = await db.user.findMany({
    where: {
      OR: search
        ? [
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
          ]
        : undefined,
    },
    include: {
      role: true,
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
