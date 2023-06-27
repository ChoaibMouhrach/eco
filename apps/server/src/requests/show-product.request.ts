import { z } from "zod";
import db from "@src/config/db";
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
            async (id) => await db.product.findUnique({ where: { id } }),
            {
              message: "Product not found",
            }
          )
      ),
  });

  return schema.safeParseAsync({
    xId: request.params.id,
  });
};

export interface ShowProductRequest extends AuthRequest {
  body: {
    xId: number;
  };
}

export const showProductRequest = {
  validate,
};
