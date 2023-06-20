import { Request } from "express";
import { AuthRequest, Authorize, Validate } from "..";
import { ROLES } from "@src/constants";
import { z } from "zod";
import db from "@src/config/db";

const validate: Validate = (request: Request) => {
  const schema = z.object({
    userId: z
      .number()
      .int()
      .positive()
      .refine(async (id) => await db.user.findUnique({ where: { id } }), {
        message: "User not found",
      }),
    products: z.array(
      z.object({
        id: z
          .number()
          .int()
          .positive()
          .refine(
            async (id) => await db.product.findUnique({ where: { id } }),
            { message: "Product not found" }
          ),
        quantity: z.number().int().positive(),
      })
    ).refine((products) => products.length > 0, { message: "At least one product is required" })
  });

  return schema.safeParseAsync(request.body);
};

const authorize: Authorize = (request: AuthRequest) => {
  const { user } = request.auth!;

  return user.roleId === ROLES.ADMIN;
};

export interface StoreOrderRequest {
  body: {
    products: {
      id: number;
      quantity: number;
    }[];
    userId: number;
  };
}

export const storeOrderRequest = {
  authorize,
  validate,
};
