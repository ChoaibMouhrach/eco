import db from "@src/config/db";
import validateQuery from "@src/lib/query-validator.lib";
import {
  DeleteUnitRequest,
  ShowUnitRequest,
  StoreUnitRequest,
  UpdateUnitRequest,
} from "@src/requests";
import { Request, Response } from "express";

const index = async (request: Request, response: Response) => {
  const { search, page, sort } = validateQuery(request.query);

  const units = await db.unit.findMany({
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
    data: units,
    page: page ?? 1,
    count: await db.unit.count(),
    limit: 8,
  });
};

const show = async (request: ShowUnitRequest, response: Response) => {
  const { xId } = request.body;

  const unit = await db.unit.findUnique({
    where: {
      id: xId,
    },
  });

  return response.json(unit);
};

const store = async (request: StoreUnitRequest, response: Response) => {
  const { name } = request.body;

  const unit = await db.unit.create({
    data: {
      name,
    },
  });

  return response.status(201).json(unit);
};

const update = async (request: UpdateUnitRequest, response: Response) => {
  const { name, xId } = request.body;

  await db.unit.update({
    where: {
      id: xId,
    },
    data: {
      name,
    },
  });

  return response.sendStatus(204);
};

const destroy = async (request: DeleteUnitRequest, response: Response) => {
  const { xId } = request.body;

  await db.unit.delete({
    where: {
      id: xId,
    },
  });

  return response.sendStatus(204);
};

export const unitController = {
  index,
  store,
  update,
  destroy,
  show,
};
