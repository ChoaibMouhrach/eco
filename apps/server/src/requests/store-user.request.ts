import { ROLES } from "@src/constants";
import { z } from "zod";
import { Request } from "express";
import db from "@src/config/db";
import { AuthRequest, Authorize, Validate } from "..";

const validate: Validate = (request: Request) => {
  const schema = z.object({
    firstName: z.string().min(3).max(60),
    lastName: z.string().min(3).max(60),
    email: z
      .string()
      .email()
      .refine(
        async (email) => !(await db.user.findUnique({ where: { email } })),
        { message: "Email Address already exists" }
      ),
    phone: z
      .string()
      .regex(/^\+[1-9]\d{1,14}$/)
      .refine(
        async (phone) => !(await db.user.findUnique({ where: { phone } })),
        { message: "Phone is already taken" }
      ),
    address: z.string().min(3).max(255),
    roleId: z
      .number()
      .refine(async (id) => await db.role.findUnique({ where: { id } }), {
        message: "Role not found",
      }),
  });

  return schema.safeParseAsync(request.body);
};

const authorize: Authorize = (request: AuthRequest) => {
  const { user } = request.auth!;
  return user.roleId === ROLES.ADMIN;
};

export interface StoreUserRequest extends AuthRequest {
  body: {
    roleId: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  };
}

export const storeUserRequest = {
  validate,
  authorize,
};
