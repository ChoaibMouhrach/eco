import { ROLES } from "@src/constants";
import { Request } from "express";
import z from "zod";
import db from "@src/config/db";
import { AuthRequest } from "..";

const authorize = (request: AuthRequest) => {
  const { user } = request.auth!;

  return user.roleId === ROLES.ADMIN;
};

const validate = (request: Request) => {
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
        quantity: z.number().int().positive().gt(0),
      })
    ),
  });

  return schema.safeParseAsync(request.body);
};

export interface StorePurchaseRequest extends Request {
  body: {
    userId: number;
    products: {
      id: number;
      quantity: number;
    }[];
  };
}

export const storePurchaseRequest = {
  validate,
  authorize,
};
