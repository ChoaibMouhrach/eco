import z from "zod";
import db from "@src/config/db";
import { Request } from "express";
import { Validate } from "..";

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
            async (id) =>
              await db.unit.findUnique({
                where: {
                  id,
                },
              }),
            {
              message: "Unit not found",
            }
          )
      ),
  });

  return schema.safeParseAsync({
    xId: request.params.id,
  });
};

export interface ShowUnitRequest extends Request {
  xId: number;
}

export const showUnitRequest = {
  validate,
};
