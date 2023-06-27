import z from "zod";
import db from "@src/config/db";
import { Request } from "express";
import { Validate } from "..";

const validate: Validate = (request) => {
  const schema = z.object({
    xId: z
      .string()
      .regex(/^\d+$/gi)
      .pipe(
        z
          .string()
          .transform((v) => Number(v))
          .refine(async (id) => await db.tag.findUnique({ where: { id } }), {
            message: "Tag not found",
          })
      ),
  });

  return schema.safeParseAsync({
    xId: request.params.id,
  });
};

export interface ShowTagRequest extends Request {
  body: {
    xId: number;
  };
}

export const showTagRequest = {
  validate,
};
