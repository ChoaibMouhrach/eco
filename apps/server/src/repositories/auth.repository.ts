import { Prisma } from "@prisma/client";
import config from "@src/config/config";
import db from "@src/config/db";
import { NotFoundException, UnauthorizedException } from "@src/exceptions";
import jwt from "jsonwebtoken";

export const createToken = (id: number, secret: string, duration: string) => {
  return jwt.sign({ id }, secret, { expiresIn: duration });
};

export const createConfirmEmailToken = (id: number) => {
  return createToken(id, config.SECRET_AUTH_EMAIL, config.DURATION_AUTH_EMAIL);
};

export const createAccessToken = (id: number) => {
  return createToken(id, config.SECRET_ACCESS, config.DURATION_ACCESS);
};

export const createRefreshToken = (id: number) => {
  return createToken(id, config.SECRET_REFRESH, config.DURATION_REFRESH);
};

const verify = <T>(
  token: string,
  secret: string
): { res: T; token: string } => {
  try {
    return {
      res: jwt.verify(token, secret) as T,
      token,
    };
  } catch (err: any) {
    throw new UnauthorizedException();
  }
};

export const verifyEmailToken = <T>(token: string) => {
  return verify<T>(token, config.SECRET_AUTH_EMAIL);
};

export const verifyAccessToken = <T>(token: string) => {
  return verify<T>(token, config.SECRET_ACCESS);
};

export const verifyRefreshToken = <T>(token: string) => {
  return verify<T>(token, config.SECRET_REFRESH);
};

export const findRefreshTokenOrThrow = async (
  where: Prisma.RefreshTokenWhereUniqueInput
) => {
  const refreshToken = await db.refreshToken.findUnique({
    where,
  });

  if (!refreshToken) {
    throw new NotFoundException(`User not found`);
  }

  return refreshToken;
};
