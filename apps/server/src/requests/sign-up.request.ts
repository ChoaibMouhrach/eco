import z from "zod";
import db from "@src/config/db";
import { Request } from "express";
import { Validate } from "..";

const validate: Validate = (request: Request) => {
  const schema = z.object({
    email: z
      .string()
      .email()
      .refine(
        async (email) => !(await db.user.findUnique({ where: { email } })),
        { message: "Email address already exists" }
      ),
    firstName: z.string().min(3).max(60),
    lastName: z.string().min(3).max(60),
    phone: z
      .string()
      .regex(/^\+[1-9]\d{1,14}$/)
      .refine(
        async (phone) => !(await db.user.findUnique({ where: { phone } })),
        { message: "Phone number already exists" }
      ),
    address: z.string().min(3).max(255),
  });

  return schema.safeParseAsync(request.body);
};

export interface SignUpRequest {
  body: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  };
}

export const signUpRequest = {
  validate,
};
