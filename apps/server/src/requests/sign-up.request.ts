import z from "zod";
import db from "@src/config/db";
import { Validate } from "..";

const validate: Validate = (body: any) => {
  const schema = z.object({
    email: z
      .string()
      .email()
      .refine(
        async (email) => !(await db.user.findUnique({ where: { email } })),
        { message: "Email address already exists" }
      ),
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    phone: z
      .string()
      .regex(/^\+[1-9]\d{1,14}$/)
      .refine(
        async (phone) => !(await db.user.findUnique({ where: { phone } })),
        { message: "Phone number already exists" }
      ),
    address: z.string().min(1),
  });

  return schema.safeParseAsync(body);
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
