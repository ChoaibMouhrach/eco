import { NextFunction, Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../interfaces/User";
import { verifyAccessToken } from "../repositories/auth.repository";

export default async function authAccessToken(request: AuthRequest, response: Response, next: NextFunction) {
  const authorization = request.headers.authorization;

  if (!authorization) {
    return response.status(401).json({ message: "unauthorized" });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return response.status(401).json({ message: "unauthorized" });
  }

  const decoded = verifyAccessToken(token);

  if ("err" in decoded) {
    if (decoded.err === "jwt expired") {
      return response.status(401).json({ message: "token expired" });
    }

    return response.status(401).json({ message: "unauthorized" });
  }

  const user = await User.findOne({ _id: decoded._id });

  if (!user) {
    throw Error("User not found");
  }

  request.auth = {
    user,
    token,
  };

  next();
}
