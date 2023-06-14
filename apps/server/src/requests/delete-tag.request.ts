import { ROLES } from "@src/constants";
import { z } from "zod";
import db from "@src/config/db";
import { AuthRequest, Authorize, Validate } from "..";

const authorize: Authorize = (request: AuthRequest) => {
  const { user } = request.auth!;

  return user.roleId === ROLES.ADMIN;
};

const validate: Validate = (request: AuthRequest) => {
  const schema = z.object({
    xId: z
      .string()
      .regex(/^\d+$/gi)
      .pipe(
        z
          .string()
          .transform((v) => Number(v))
          .refine(
            async (id) => {
              return await db.tag.findUnique({
                where: {
                  id,
                },
              });
            },
            { message: "Tag not found" }
          )
      ),
  });

  return schema.safeParseAsync({
    xId: request.params.id,
  });
};

export interface DeleteTagRequest extends AuthRequest {
  body: {
    xId: number;
  };
}

export const deleteTagRequest = {
  validate,
  authorize,
};
