import { ROLES } from "@src/constants";
import z from "zod";
import db from "@src/config/db";
import { AuthRequest, Authorize, Validate } from "..";

const authorize: Authorize = (request: AuthRequest) => {
  const { user } = request.auth!;
  return user.roleId === ROLES.ADMIN;
};

const validate: Validate = (request: AuthRequest) => {
  const schema = z.object({
    name: z
      .string()
      .min(1)
      .max(60)
      .refine(async (name) => !(await db.tag.findUnique({ where: { name } })), {
        message: "Name already exists",
      }),
  });

  return schema.safeParseAsync(request.body);
};

export interface StoreTagRequest extends AuthRequest {
  body: {
    name: string;
  };
}

export const storeTagRequest = {
  validate,
  authorize,
};
