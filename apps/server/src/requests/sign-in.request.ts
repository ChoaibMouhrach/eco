import z from "zod";
import { Request } from "express";
import db from "@src/config/db";
import { Validate } from "..";

const validate: Validate = (request: Request) => {
  const schema = z.object({
    email: z
      .string()
      .email()
      .refine(async (email) => await db.user.findUnique({ where: { email } }), {
        message: "Email address does not exists",
      }),
  });

  return schema.safeParseAsync(request.body);
};

export interface SignInRequest extends Request {
  body: {
    email: string;
  };
}

export const signInRequest = {
  validate,
};
