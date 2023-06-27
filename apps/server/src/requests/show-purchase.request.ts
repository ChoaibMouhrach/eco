import { ROLES } from "@src/constants";
import { Request } from "express";
import z from "zod";
import db from "@src/config/db";
import { AuthRequest } from "..";

const validate = (request: Request) => {
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

export interface ShowPurchaseRequest {
  body: {
    xId: number;
  };
}

export const showPurchaseRequest = {
  validate,
  authorize,
};
