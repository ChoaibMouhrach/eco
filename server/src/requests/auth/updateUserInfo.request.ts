import { z } from "zod";
import { Validate } from "../../interfaces/Request";
import User from "../../models/User";
import { Request } from "express";
import { AuthRequest } from "../../interfaces/User";

export interface UpdateUserInfoRequest extends AuthRequest {
  body: {
    firstName?: string;
    lastName?: string;
    email?: string;
    password: string;
  };
}

const validate: Validate = (request: Request) => {
  return z
    .object({
      firstName: z.string().min(3).max(60).optional(),
      lastName: z.string().min(3).max(60).optional(),
      email: z
        .string()
        .email()
        .refine(
          async (email) => {
            return !(await User.exists({ email }));
          },
          { message: "Email Address is already taken" }
        )
        .optional(),
      password: z.string().min(8),
    })
    .safeParseAsync(request.body);
};

export default {
  validate,
};
