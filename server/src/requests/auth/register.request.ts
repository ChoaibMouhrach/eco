import { Request } from "express";
import { Validate } from "../../interfaces/Request";
import { z } from "zod";
import User from "../../models/User";

export interface RegisterRequest extends Request {
  body: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;
    gender: string;
    password: string;
    password_confirmation: string;
    birthDay: string;
  };
}

const validate: Validate = async (request: Request) => {
  return await z
    .object({
      firstName: z.string().min(3).max(60),
      lastName: z.string().min(3).max(60),
      email: z
        .string()
        .email()
        .refine(
          async (email) => {
            return !(await User.exists({ email }));
          },
          { message: "Email Address is already taken" }
        ),
      birthDay: z.string().datetime(),
      address: z.string().min(8).max(255),
      gender: z.enum(["M", "F"]),
      phone: z.string().max(255),
      password: z.string().min(8),
      password_confirmation: z.string().min(8),
    })
    .safeParseAsync(request.body);
};

export default {
  validate,
};
