import User from "../models/User";
import { NextFunction, Response } from "express";
import { AuthRequest } from "../interfaces/User";
import { verifyRefreshToken } from "../repositories/auth.repository";

export default async function authRefreshToken(request: AuthRequest, response: Response, next: NextFunction) {
  const authorization = request.headers.authorization;

  if (!authorization) {
    return response.status(401).json({
      message: "unauthorized",
    });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return response.status(401).json({
      message: "unauthorized",
    });
  }

  const decoded = verifyRefreshToken(token);

  if ("err" in decoded) {
    return response.status(401).json({
      message: "unauthorized",
    });
  }

  const user = await User.findOne({ _id: decoded._id });

  if (!user || user.deletedAt || !user.refreshTokens.find((refreshToken) => refreshToken.token == token)) {
    return response.status(404).json({
      message: "User does not exists",
    });
  }

  request.auth = {
    user: user,
    token,
  };

  next();
}
