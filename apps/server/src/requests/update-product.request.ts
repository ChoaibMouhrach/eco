import { Request } from "express";
import { ROLES } from "@src/constants";
import { z } from "zod";
import db from "@src/config/db";
import { AuthRequest, Authorize, Validate } from "..";

const validate: Validate = (request: Request) => {
  const schema = z.object({
    xId: z
      .string()
      .regex(/^\d+$/gi)
      .pipe(
        z
          .string()
          .transform((v) => Number(v))
          .refine(
            async (id) => await db.product.findUnique({ where: { id } }),
            { message: "Product not found" }
          )
      ),
    name: z.string().min(3).max(255).optional(),
    description: z.string().min(200).max(2000).optional(),
    price: z
      .string()
      .regex(/^\d+$/gi)
      .pipe(z.string().transform((value) => Number(value)))
      .optional(),
    quantity: z
      .string()
      .regex(/^\d+$/gi)
      .pipe(z.string().transform((value) => Number(value)))
      .optional(),
    categoryId: z
      .string()
      .regex(/^\d+$/gi)
      .pipe(
        z
          .string()
          .transform((v) => Number(v))
          .refine(
            async (id) => await db.category.findUnique({ where: { id } }),
            {
              message: "Category not found",
            }
          )
      )
      .optional(),
    unitId: z
      .string()
      .regex(/^\d+$/gi)
      .pipe(
        z
          .string()
          .transform((v) => Number(v))
          .refine(
            async (id: number) => await db.unit.findUnique({ where: { id } }),
            { message: "Unit not found" }
          )
      )
      .optional(),
    tags: z
      .string()
      .min(1)
      // fix value if it starts with ,
      .transform((v) => (v[0] === "," ? v.substring(1) : v))
      // fix value if it ends with ,
      .transform((v) =>
        v[v.length - 1] === "," ? v.substring(0, v.length - 1) : v
      )
      .transform((v) => v.split(",").map((value) => value.trim()))
      .optional(),
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

export interface UpdateProductRequest extends Request {
  body: {
    xId: number;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    unitId?: number;
    categoryId?: number;
    tags?: string[];
  };
}

export const updateProductRequest = {
  validate,
  authorize,
};
