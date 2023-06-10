import z from "zod";
import db from "@src/config/db";
import { Request } from "express";
import { Validate } from "..";

const validate: Validate = (body: any) => {
  const schema = z.object({
    email: z
      .string()
      .email()
      .refine(async (email) => await db.user.findUnique({ where: { email } }), {
        message: "Use does not exists",
      }),
  });

  return schema.safeParseAsync(body);
};

export interface SignInRequest extends Request {
  body: {
    email: string;
  };
}

export const signInRequest = {
  validate,
};
