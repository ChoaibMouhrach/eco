import z from "zod";
import db from "@src/config/db";
import { Request } from "express";
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
            async (id) =>
              await db.category.findUnique({
                where: {
                  id,
                },
              }),
            {
              message: "Category not found",
            }
          )
      ),
  });

  return schema.safeParseAsync({
    xId: request.params.id,
  });
};

export interface ShowCategoryRequest extends Request {
  body: {
    xId: number;
  };
}

export const showCategoryRequest = {
  validate,
};
