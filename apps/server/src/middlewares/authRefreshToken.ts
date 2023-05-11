import User from '../models/User';
import { NextFunction, Response } from 'express';
import { AuthRequest } from '../interfaces/User';
import { verifyRefreshToken } from '../repositories/auth.repository';
import { NotFoundException } from '../common';
import { UnauthorizedException } from '../common';

export default async function authRefreshToken(
  request: AuthRequest,
  _response: Response,
  next: NextFunction,
) {
  const authorization = request.headers.authorization;

  if (!authorization) {
    throw new UnauthorizedException('unauthorized');
  }

  const token = authorization.split(' ')[1];

  if (!token) {
    throw new UnauthorizedException('unauthorized');
  }

  const decoded = verifyRefreshToken(token);

  if ('err' in decoded) {
    throw new UnauthorizedException('unauthorized');
  }

  const user = await User.findOne({ _id: decoded._id });

  if (
    !user ||
    user.deletedAt ||
    !user.refreshTokens.find((refreshToken) => refreshToken.token == token)
  ) {
    throw new NotFoundException('User does not exists');
  }

  request.auth = {
    user: user,
    token,
  };

  next();
}
