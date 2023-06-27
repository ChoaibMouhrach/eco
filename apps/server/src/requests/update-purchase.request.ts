import { ROLES } from "@src/constants";
import { Request } from "express";
import { z } from "zod";
import db from "@src/config/db";
import { AuthRequest } from "..";

const validate = (request: Request) => {
  const schema = z
    .object({
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
      userId: z
        .number()
        .int()
        .positive()
        .refine(async (id) => await db.user.findUnique({ where: { id } }), {
          message: "User not found",
        })
        .optional(),
      products: z
        .array(
          z.object({
            id: z
              .number()
              .int()
              .positive()
              .refine(
                async (id) => await db.product.findUnique({ where: { id } }),
                { message: "Product not found" }
              ),
            quantity: z.number().int().positive().gt(0),
          })
        )
        .optional(),
    })
    .refine((data) => Object.keys(data).length > 1, {
      message: "Change something first",
    });

  return schema.safeParseAsync({
    ...request.body,
    xId: request.params.id,
  });
};

const authorize = async (request: AuthRequest) => {
  const { user } = request.auth!;

  return user.roleId === ROLES.ADMIN;
};

export interface UpdatePurchaseRequest extends Request {
  body: {
    xId: number;
    userId?: number;
    products?: {
      id: number;
      quantity: number;
    }[];
  };
}

export const updatePurchaseRequest = {
  validate,
  authorize,
};
