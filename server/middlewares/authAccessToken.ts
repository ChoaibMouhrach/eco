import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import User from "../models/User";

export default async function authAccessToken(request: Request, response: Response, next: NextFunction) {

  if (process.env.ENV === "testing" && request.url !== "/verify") {
    return next()
  }

  if (!process.env.ACCESS_SECRET || !process.env.REFRESH_SECRET) {
    throw Error("ACCESS SECRET or REFRESH SECRET is not defined")
  }

  if (!process.env.ACCESS_TOKEN_DURATION) {
    throw Error("ACCESS TOKEN DURATION is not defined")
  }

  const authorization = request.headers.authorization

  if (!authorization) {
    return response.status(401).json({ message: "unauthorized" })
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return response.status(401).json({ message: "unauthorized" })
  }

  try {

    const { _id } = jwt.verify(token, process.env.ACCESS_SECRET) as { _id: string };

    const user = await User.findOne({ _id });

    if (!user) {
      throw Error("User not found")
    }

    request.auth = {
      user: user.prepare(),
      token,
    }

    next();
    return

  } catch (err: any) {

    if (err.message === "jwt expired") {
      return response.status(401).json({ message: "token expired" })
    }

    return response.status(401).json({ message: "unauthorized" })
  }

}
