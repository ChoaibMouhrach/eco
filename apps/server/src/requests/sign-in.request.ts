import z from "zod";
import { Request } from "express";
import { Validate } from "..";

const validate: Validate = (request: Request) => {
  const schema = z.object({
    email: z.string().email(),
  });

  return schema.safeParse(request.body);
};

export interface SignInRequest extends Request {
  body: {
    email: string;
  };
}

export const signInRequest = {
  validate,
};
