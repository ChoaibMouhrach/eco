import { Request, Response } from "express";
import {
  Project,
  Search,
  Sort,
  build,
  paginate,
} from "../utils/builder";
import User from "../models/User";
import { isValidObjectId } from "mongoose";
import { BadRequestException, NotFoundException } from "../common";
import bcrypt from "bcrypt"
import { config } from "../config/config";
import { StoreRequest } from "../requests/user/store.request";
import { UpdateRequest } from "../requests/user/update.request";

export const index = async (
  request: Request<{}, {}, {}, Record<string, string | undefined>>,
  response: Response
) => {
  const search: Search = {
    value: request.query.search,
    trash: request.query.trash,
    fields: ["firstName", "lastName", "email"],
  };

  const project: Project = {
    value: request.query.project,
    fields: {
      default: {
        firstName: true,
        lastName: true,
      },
    },
  };

  const sort: Sort = {
    value: request.query.sort,
    fields: ["firstName", "lastName", "email"],
  };

  const query = build({ sort, search, project, page: request.query.page });
  let users = await User.aggregate(query);

  users = users.map((user) => {
    delete user.password;
    delete user.refreshTokens;
    delete user.forgotPasswordTokens;
    delete user.confirmEmailTokens;
    return user;
  });

  const response_body = await paginate(
    users,
    request.query.page,
    User,
    request.query.trash
  );
  return response.json(response_body);
};

export const show = async (request: Request<Record<string, string>>, response: Response) => {

  const { id } = request.params

  if (!isValidObjectId(id)) {
    throw new BadRequestException("Id is not valid")
  }

  const user = await User.findOne({ _id: id });

  if (!user) {
    throw new NotFoundException("User Not found")
  }

  return response.json(user.prepare())
};

export const store = async (request: StoreRequest, response: Response) => {

  const {
    firstName,
    lastName,
    email,
    password,
    isAdmin,
    verifiedAt
  } = request.body

  const user = new User({
    firstName,
    lastName,
    email,
    password: bcrypt.hashSync(password, Number(config.SALT)),
    isAdmin,
    verifiedAt
  })

  await user.save()

  return response.status(201).json(user.prepare())

};

export const update = async (request: UpdateRequest, response: Response) => {

  const { id } = request.params;
  const body = request.body

  if (!isValidObjectId(id)) {
    throw new BadRequestException("Id is invalid")
  }

  const user = await User.findOneAndUpdate(
    { _id: id },
    { $set: body },
    { new: true }
  );

  if (!user) {
    throw new NotFoundException("User does not exists")
  }

  return response.json(user)
};

export const destroy = async (request: Request<Record<string, string>>, response: Response) => {

  const { id } = request.params

  if (!isValidObjectId(id)) {
    throw new BadRequestException("Id is not valid");
  }

  const user = await User.findOneAndDelete({ _id: id })

  if (!user) {
    throw new NotFoundException("User does not exists")
  }

  return response.sendStatus(204)
};
