import { z } from "zod"
import { AuthRequest, Authorize, Validate } from ".."
import db from "@src/config/db"
import { Request } from "express"

const validate: Validate = (request: Request) => {
  const schema = z.object({
    name: z.string().min(1).max(255).refine(async (name) => !(await db.category.findUnique({ where: { name } })), { message: "Category already exists" })
  })

  return schema.safeParseAsync(request.body)
}

export interface StoreCategoryRequest extends AuthRequest {
  body: {
    name: string;
  }
}

const authorize: Authorize = async (request: AuthRequest) => {
  const {
    user
  } = request.auth!

  return user.roleId === 2;
}

export const storeCategoryRequest = {
  validate,
  authorize
}
