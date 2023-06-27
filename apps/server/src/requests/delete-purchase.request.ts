import z from "zod";
import db from "@src/config/db";
import { ROLES } from "@src/constants";
import { AuthRequest, Validate } from "..";

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
            async (id) => await db.purchase.findUnique({ where: { id } }),
            { message: "Purchase not found" }
          )
      ),
  });

  return schema.safeParseAsync({
    xId: request.params.id,
  });
};

const authorize = (request: AuthRequest) => {
  const { user } = request.auth!;

  return user.roleId === ROLES.ADMIN;
};

export interface DeletePurchaseRequest extends AuthRequest {
  body: {
    xId: number;
  };
}

export const deletePurchaseRequest = {
  validate,
  authorize,
};
