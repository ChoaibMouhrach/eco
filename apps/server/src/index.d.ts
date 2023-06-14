import { RefreshToken, User } from "@prisma/client";
import { Request } from "express";

export interface AuthRequest extends Request {
  auth?: {
    user: User;
    refreshToken?: RefreshToken;
  };
}

export type Validate = (
  request: Request
) => SafeParseReturnType<any, any> | Promise<SafeParseReturnType<any, any>>;

export type Authorize = (request: AuthRequest) => Promise<boolean> | boolean;
