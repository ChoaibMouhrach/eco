import { findUserOrThrow, verifyAccessToken } from "@src/repositories";
import { NextFunction, Response } from "express";
import { AuthRequest } from "..";

export const authAccess = async (
  request: AuthRequest,
  _response: Response,
  next: NextFunction
) => {
  const {
    res: { id },
  } = verifyAccessToken<{ id: number }>(request.cookies.accessToken);

  const user = await findUserOrThrow({ id });

  request.auth = {
    user,
  };

  next();
};
