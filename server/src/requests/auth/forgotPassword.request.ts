import { z } from "zod";
import { Validate } from "../../interfaces/Request";
import { Request } from "express";
import User from "../../models/User";

export interface ForgotPasswordRequest extends Request {
  body: {
    email: string;
  };
}

const validate: Validate = async (request: Request) => {
  return await z
    .object({
      email: z
        .string()
        .email()
        .refine(
          async (email) => {
            return await User.exists({ email });
          },
          { message: "Email Address does not exists with in our database" }
        ),
    })
    .safeParseAsync(request.body);
};

export default {
  validate,
};
