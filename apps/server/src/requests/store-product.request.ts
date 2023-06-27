import { Request } from "express";
import { ROLES } from "@src/constants";
import { z } from "zod";
import db from "@src/config/db";
import { AuthRequest, Authorize, Validate } from "..";

const validate: Validate = (request: Request) => {
  const schema = z.object({
    name: z.string().min(3).max(255),
    description: z.string().min(200).max(2000),
    price: z
      .string()
      .regex(/^\d+$/gi)
      .pipe(z.string().transform((value) => Number(value))),
    quantity: z
      .string()
      .regex(/^\d+$/gi)
      .pipe(z.string().transform((value) => Number(value))),
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
      ),
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
      ),
    tags: z
      .string()
      .min(1)
      // fix value if it starts with ,
      .transform((v) => (v[0] === "," ? v.substring(1) : v))
      // fix value if it ends with ,
      .transform((v) =>
        v[v.length - 1] === "," ? v.substring(0, v.length - 1) : v
      )
      .transform((v) => v.split(",").map((value) => value.trim())),
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

export interface StoreProductRequest extends Request {
  body: {
    name: string;
    description: string;
    price: number;
    quantity: number;
    categoryId: number;
    unitId: number;
    tags: string[];
  };
}

export const storeProductRequest = {
  validate,
  authorize,
};
