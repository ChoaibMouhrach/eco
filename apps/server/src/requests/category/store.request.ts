import { z } from "zod";
import { User } from "../../interfaces/User";
import { Request } from "express";
import { Authorize, Validate } from "../../interfaces/Request";

export interface StoreRequest extends Request {
  body: {
    name: string;
  };
}

const authorize: Authorize = (user?: User) => {
  return user && user.verifiedAt && user.isAdmin;
};

const validate: Validate = (request: Request) => {
  return z
    .object({
      name: z.string().min(3).max(60),
    })
    .safeParse(request.body);
};

export default {
  authorize,
  validate,
};
