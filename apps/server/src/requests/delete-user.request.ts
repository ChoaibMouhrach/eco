import { ROLES } from "@src/constants";
import { z } from "zod";
import { Request } from "express";
import db from "@src/config/db";
import { AuthRequest, Authorize, Validate } from "..";

const validate: Validate = (request: Request) => {
  const schema = z.object({
    xId: z
      .string()
      .regex(/^\d+$/gi)
      .pipe(
        z
          .string()
          .transform((v) => Number(v))
          .refine(
            async (id: number) => await db.user.findUnique({ where: { id } }),
            { message: "User not found" }
          )
      ),
  });

  return schema.safeParseAsync({
    xId: request.params.id,
  });
};

const authorize: Authorize = (request: AuthRequest) => {
  const { user } = request.auth!;
  return user.roleId === ROLES.ADMIN;
};

export interface DeleteUserRequest extends AuthRequest {
  body: {
    xId: number;
  };
}

export const deleteUserRequest = {
  validate,
  authorize,
};
