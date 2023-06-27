import { NextFunction, Response } from "express";
import {
  findRefreshTokenOrThrow,
  findUserOrThrow,
  verifyRefreshToken,
} from "@src/repositories";
import { UnauthorizedException } from "@src/exceptions";
import { AuthRequest } from "..";

export const authRefresh = async (
  request: AuthRequest,
  _response: Response,
  next: NextFunction
) => {
  const {
    res: { id },
    token,
  } = verifyRefreshToken<{ id: number }>(request.cookies.refreshToken);

  const refreshToken = await findRefreshTokenOrThrow({ token });

  if (!refreshToken) {
    throw new UnauthorizedException("Refresh Token required");
  }

  const user = await findUserOrThrow({ id });

  request.auth = {
    user,
    refreshToken,
  };

  return next();
};
