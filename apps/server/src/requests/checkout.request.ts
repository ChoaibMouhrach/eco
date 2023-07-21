import { Request } from "express";
import z from "zod";
import db from "@src/config/db";
import isCreditCard from "validator/lib/isCreditCard";
import { AuthRequest, Validate } from "..";

const validate: Validate = (request: Request) => {
  const schema = z.object({
    card: z.object({
      holder: z.string().regex(/^\w+\s\w+$/gi),
      number: z.string().refine(isCreditCard, { message: "Invalid card" }),
      expiration: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/gi),
      ccv: z.string().regex(/^[0-9]{3,4}$/gi),
    }),
    items: z.array(
      z.object({
        quantity: z.number().positive().int().gt(0),
        id: z
          .number()
          .int()
          .positive()
          .gt(0)
          .refine(
            async (id) => {
              return await db.product.findUnique({ where: { id } });
            },
            {
              message: "Product does not exists",
            }
          ),
      })
    ),
  });

  return schema.safeParseAsync(request.body);
};

export interface CheckOutRequest extends AuthRequest {
  body: {
    card: {
      holder: string;
      number: string;
      expiration: string;
      ccv: string;
    };
    items: {
      id: number;
      quantity: number;
    }[];
  };
}

export const checkOutRequest = {
  validate,
};
