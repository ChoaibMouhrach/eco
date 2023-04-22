import { Request } from "express";
import { Validate } from "../../interfaces/Request";
import { z } from "zod";

export interface ResetPasswordRequest extends Request {
  body: {
    password: string;
    password_confirmation: string;
  };
}

const validate: Validate = (request: Request) => {
  return z
    .object({
      password: z.string().min(8),
      password_confirmation: z.string().min(8),
    })
    .refine((data) => data.password === data.password_confirmation, { path: ["password_confirmation"], message: "Password and Password confirmation does not match" })
    .safeParse(request.body);
};

export default {
  validate,
};
