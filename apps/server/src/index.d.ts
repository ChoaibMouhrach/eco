import { RefreshToken, User } from "@prisma/client";
import { Request } from "express";

export interface AuthRequest extends Request {
  auth?: {
    user: User;
    refreshToken?: RefreshToken;
  };
}

type AuthorizeResponse = {
  authorized: boolean;
  reason?: string;
};

export type Validate = (
  body: any
) => SafeParseReturnType<any, any> | Promise<SafeParseReturnType<any, any>>;

export type Authorize = (
  request: AuthRequest
) => Promise<AuthorizeResponse> | AuthorizeResponse;
