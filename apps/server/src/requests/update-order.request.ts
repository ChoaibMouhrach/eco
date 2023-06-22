import { ROLES } from "@src/constants";
import { Request } from "express";
import { z } from "zod";
import db from "@src/config/db";
import { AuthRequest, Authorize, Validate } from "..";

const validate: Validate = (request: Request) => {
  const schema = z
    .object({
      xId: z
        .string()
        .regex(/^\d+$/gi)
        .pipe(
          z
            .string()
            .transform((value) => Number(value))
            .refine(
              async (id) => await db.order.findUnique({ where: { id } }),
              {
                message: "Order not found",
              }
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
            quantity: z.number().int().positive().gte(1),
          })
        )
        .refine((products) => products.length > 0, {
          message: "At least one product is required",
        })
        .optional(),
    })
    .refine((data) => Object.keys(data).length > 1, {
      message: "At least one field is required",
    });

  return schema.safeParseAsync({
    ...request.body,
    xId: request.params.id,
  });
};

const authorize: Authorize = (request: AuthRequest) => {
  const { user } = request.auth!;

  return user.roleId === ROLES.ADMIN;
};

export interface UpdateOrderRequest {
  body: {
    xId: number;
    userId?: number;
    products?: {
      id: number;
      quantity: number;
    }[];
  };
}

export const updateOrderRequest = {
  authorize,
  validate,
};
