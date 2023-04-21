import { SafeParseReturnType } from "zod";
import { User } from "./User";
import { Request } from "express";

export type Authorize = (user?: User) => any;

export type Validate = (request: Request) => Promise<SafeParseReturnType<any, any>> | SafeParseReturnType<any, any>;
