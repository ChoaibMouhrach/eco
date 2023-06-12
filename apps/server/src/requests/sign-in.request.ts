import z from "zod";
import { Request } from "express";
import { Validate } from "..";

const validate: Validate = (body: any) => {
  const schema = z.object({
    email: z.string().email(),
  });

  return schema.safeParse(body);
};

export interface SignInRequest extends Request {
  body: {
    email: string;
  };
}

export const signInRequest = {
  validate,
};
