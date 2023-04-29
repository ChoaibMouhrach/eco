import { NextFunction, Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../interfaces/User";
import { verifyAccessToken } from "../repositories/auth.repository";
import { NotFoundException } from "../common";
import { UnauthorizedException } from "../common";

export default async function authAccessToken(request: AuthRequest, response: Response, next: NextFunction) {
  const authorization = request.headers.authorization;

  if (!authorization) {
    throw new UnauthorizedException("unauthorized");
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    throw new UnauthorizedException("unauthorized");
  }

  const decoded = verifyAccessToken(token);

  if ("err" in decoded) {
    if (decoded.err === "jwt expired") {
      throw new UnauthorizedException("token expired");
    }

    throw new UnauthorizedException("unauthorized");
  }

  const user = await User.findOne({ _id: decoded._id });

  if (!user || user.deletedAt) {
    throw new NotFoundException("User does not exists");
  }

  request.auth = {
    user,
    token,
  };

  next();
}
