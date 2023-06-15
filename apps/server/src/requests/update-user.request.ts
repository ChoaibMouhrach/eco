import { ROLES } from "@src/constants";
import { z } from "zod";
import { Request } from "express";
import { AuthRequest, Authorize, Validate } from "..";
import db from "@src/config/db";

const validate: Validate = (request: Request) => {
  const schema = z.object({
    xId: z
      .string()
      .regex(/^\d+$/gi)
      .pipe(
        z
          .string()
          .transform((v) => Number(v))
          .refine(async () => { })
      ),
    firstName: z.string().min(3).max(60).optional(),
    lastName: z.string().min(3).max(60).optional(),
    email: z.string().email().refine(async (email) => !(await db.user.findUnique({ where: { email } })), { message: "Email Address already exists" }).optional(),
    phone: z.string()
      .regex(/^\+[1-9]\d{1,14}$/)
      .refine(async (phone) => !(await db.user.findUnique({ where: { phone } })), { message: "Phone is already taken" }).optional(),
    address: z.string().min(3).max(255).optional(),
    roleId: z.number().refine(async (id) => await db.role.findUnique({ where: { id } }), "Role not found")
  });

  return schema.safeParseAsync(request.body);
};

const authorize: Authorize = (request: AuthRequest) => {
  const { user } = request.auth!;
  return user.roleId === ROLES.ADMIN;
};

export interface UpdateUserRequest extends AuthRequest {
  body: {
    xId: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    roleId?: number;
  };
}

export const updateUserRequest = {
  validate,
  authorize,
};
