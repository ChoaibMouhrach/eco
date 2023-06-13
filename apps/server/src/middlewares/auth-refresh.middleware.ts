import { NextFunction } from "express";
import { AuthRequest } from "..";
import {
  findRefreshTokenOrThrow,
  findUserOrThrow,
  verifyRefreshToken,
} from "@src/repositories";
import { UnauthorizedException } from "@src/exceptions";
import { Response } from "express";

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
    throw new UnauthorizedException();
  }

  const user = await findUserOrThrow({ id });

  request.auth = {
    user,
    refreshToken,
  };

  return next();
};
