import z from "zod";
import { AuthRequest, Authorize, Validate } from "..";
import { Request } from "express";
import { ROLES } from "@src/constants";
import db from "@src/config/db";

const validate: Validate = (request: Request) => {
  const schema = z.object({
    xId: z.string().regex(/^\d+$/ig).transform((xId) => Number(xId)).refine(async (xId) => await db.category.findUnique({ where: { id: xId } }), {
      message: "Category not found"
    })
  })

  return schema.safeParse({
    xId: request.query.id
  })
}

export interface DeleteCategoryRequest extends AuthRequest {
  body: {
    xId: number
  }
}

const authorize: Authorize = (request: AuthRequest) => {
  const {
    user
  } = request.auth!

  return user.roleId === ROLES.ADMIN
}

export const deleteCategoryRequest = {
  authorize,
  validate
}
