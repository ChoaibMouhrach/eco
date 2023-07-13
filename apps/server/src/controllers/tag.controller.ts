import { Prisma } from "@prisma/client";
import db from "@src/config/db";
import validateQuery from "@src/lib/query-validator.lib";
import {
  DeleteTagRequest,
  StoreTagRequest,
  UpdateTagRequest,
  ShowTagRequest,
} from "@src/requests";
import { Request, Response } from "express";

const index = async (request: Request, response: Response) => {
  const { search, page, sort } = validateQuery(request.query);

  const where: Prisma.TagWhereInput = {
    name: {
      contains: search,
    },
  };

  const tags = await db.tag.findMany({
    where,
    orderBy: sort,
    skip: page ? (page - 1) * 8 : 0,
    take: 8,
  });

  const count = await db.tag.count({
    where,
  });

  return response.json({
    data: tags,
    count,
    limit: 8,
    page: page ?? 1,
  });
};

const show = async (request: ShowTagRequest, response: Response) => {
  const { xId: id } = request.body;

  const tag = await db.tag.findUnique({
    where: {
      id: Number(id),
    },
  });

  return response.json(tag);
};

const store = async (request: StoreTagRequest, response: Response) => {
  const { name } = request.body;

  const tag = await db.tag.create({
    data: {
      name,
    },
  });

  return response.status(201).json(tag);
};

const update = async (request: UpdateTagRequest, response: Response) => {
  const { name, xId } = request.body;

  await db.tag.update({
    where: {
      id: xId,
    },
    data: {
      name,
    },
  });

  return response.sendStatus(204);
};

const destroy = async (request: DeleteTagRequest, response: Response) => {
  const { xId } = request.body;

  await db.tag.delete({
    where: {
      id: xId,
    },
  });

  return response.sendStatus(204);
};

export const tagController = {
  index,
  store,
  update,
  destroy,
  show,
};
