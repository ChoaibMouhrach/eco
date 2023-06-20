import { ROLES } from "@src/constants";
import { AuthRequest, Authorize, Validate } from "..";
import z from "zod";
import { Request } from "express";
import db from "@src/config/db";

const authorize: Authorize = (request: AuthRequest) => {
  const { user } = request.auth!;

  return user.roleId === ROLES.ADMIN;
};

export const validate: Validate = (request: Request) => {
  const schema = z.object({
    xId: z.string()
      .regex(/^\d+$/gi)
      .pipe(z.string().transform(v => Number(v)).refine(async (id) => await db.order.findUnique({ where: { id } }), { message: "Order not found" })),
  })

  return schema.safeParseAsync({
    xId: request.params.id
  })
}

export interface ShowOrderRequest {
  body: {
    xId: number
  }
}

export const showOrderRequest = {
  authorize,
  validate
};
