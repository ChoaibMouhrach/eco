import z from "zod";
import { Request } from "express";
import { ROLES } from "@src/constants";
import db from "@src/config/db";
import { AuthRequest, Authorize, Validate } from "..";

const validate: Validate = (request: Request) => {
  const schema = z.object({
    xId: z
      .string()
      .regex(/^\d+$/ig)
      .pipe(z.string().transform((xId) => Number(xId))
        .refine(
          async (xId) => await db.category.findUnique({ where: { id: xId } }),
          {
            message: "Category not found",
          }
        )),
  });

  return schema.safeParseAsync({
    xId: request.params.id,
  });
};

export interface DeleteCategoryRequest extends AuthRequest {
  body: {
    xId: number;
  };
}

const authorize: Authorize = (request: AuthRequest) => {
  const { user } = request.auth!;

  return user.roleId === ROLES.ADMIN;
};

export const deleteCategoryRequest = {
  authorize,
  validate,
};
