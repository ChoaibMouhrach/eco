import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import User from "../models/User";
import { User as UserType } from "../types/auth";

export default async function authAccessToken(request: Request, response: Response, next: NextFunction) {

  if (!process.env.ACCESS_SECRET || !process.env.REFRESH_SECRET) {
    throw Error("ACCESS SECRET or REFRESH SECRET is not defined")
  }

  if (!process.env.ACCESS_TOKEN_DURATION) {
    throw Error("ACCESS TOKEN DURATION is not defined")
  }

  const authorization = request.headers.authorization

  if (!authorization) {
    return response.status(401).json({ message: "unauthenticated" })
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return response.status(401).json({ message: "unauthenticated" })
  }

  try {

    const { _id } = jwt.verify(token, process.env.ACCESS_SECRET) as { _id: string };

    const user = await User.findOne({ _id });

    if (!user) {
      throw Error("User not found")
    }

    let userObject = user.toObject() as UserType & { password?: string, refreshTokens?: string[] };

    delete userObject.refreshTokens;
    delete userObject.password

    request.auth = {
      user: userObject,
      token,
    }

    next();
    return

  } catch (err: any) {

    if (err.message === "jwt expired") {
      return response.status(401).json({ message: "token expired" })
    }

    return response.status(401).json({ message: "unauthenticated" })
  }

}
