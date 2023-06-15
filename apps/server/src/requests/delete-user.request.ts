import { ROLES } from "@src/constants";
import { z } from "zod";
import { Request } from "express";
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
          .refine(async () => { })
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
