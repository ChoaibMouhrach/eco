import { ROLES } from "@src/constants";
import z from "zod";
import db from "@src/config/db";
import { Request } from "express";
import { AuthRequest, Authorize, Validate } from "..";

const authorize: Authorize = (request: AuthRequest) => {
  const { user } = request.auth!;
  return user.roleId === ROLES.ADMIN;
};

const validate: Validate = (request: Request) => {
  const schema = z.object({
    name: z
      .string()
      .min(1)
      .max(60)
      .refine(
        async (name) => !(await db.category.findUnique({ where: { name } })),
        { message: "Name already exists" }
      ),
    xId: z
      .string()
      .regex(/^\d+$/gi)
      .pipe(
        z
          .string()
          .transform((v) => Number(v))
          .refine(
            async (id) => await db.category.findUnique({ where: { id } }),
            { message: "Category not found" }
          )
      ),
  });

  return schema.safeParseAsync({
    ...request.body,
    xId: request.params.id,
  });
};

export interface UpdateCategoryRequest extends AuthRequest {
  body: {
    name: string;
    xId: number;
  };
}

export const updateCategoryRequest = {
  authorize,
  validate,
};
