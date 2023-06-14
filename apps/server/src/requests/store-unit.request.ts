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
      .max(255)
      .refine(async (name) => !(await db.unit.findUnique({ where: { name } })), {
        message: "Unit already exists",
      }),
  });

  return schema.safeParseAsync(request.body);
};

export interface StoreUnitRequest extends AuthRequest {
  body: {
    name: string;
  };
}

export const storeUnitRequest = {
  validate,
  authorize,
};
