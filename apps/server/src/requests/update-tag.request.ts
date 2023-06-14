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
      .refine(async (name) => !(await db.tag.findUnique({ where: { name } })), {
        message: "Tag already exists",
      }),
    xId: z
      .string()
      .regex(/^\d+$/gi)
      .pipe(
        z
          .string()
          .transform((v) => Number(v))
          .refine(async (id) => await db.tag.findUnique({ where: { id } }), {
            message: "Tag not found",
          })
      ),
  });

  return schema.safeParseAsync({
    ...request.body,
    xId: request.params.id,
  });
};

export interface UpdateTagRequest extends AuthRequest {
  body: {
    name: string;
    xId: number;
  };
}

export const updateTagRequest = {
  validate,
  authorize,
};
