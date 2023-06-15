import { ROLES } from "@src/constants";
import { AuthRequest, Authorize, Validate } from "..";
import { z } from "zod";
import db from "@src/config/db";

const validate: Validate = (request: AuthRequest) => {
  const schema = z.object({
    xId: z.string().regex(/^\d+$/ig).pipe(z.string().transform(v => Number(v)).refine(async (id) => await db.user.findUnique({ where: { id } }), { message: "User not found" }))
  })

  return schema.safeParseAsync({
    xId: request.params.id
  })
}

const authorize: Authorize = (request: AuthRequest) => {
  const { user } = request.auth!
  return user.roleId === ROLES.ADMIN
}

export interface ShowUserRequest extends AuthRequest {
  body: {
    xId: number;
  }
}

export const showUserRequest = {
  validate,
  authorize
}
