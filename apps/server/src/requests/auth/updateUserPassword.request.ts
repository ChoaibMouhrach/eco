import { z } from "zod";
import { Validate } from "../../interfaces/Request";
import { Auth, AuthRequest, User } from "../../interfaces/User";
import bcrypt from "bcrypt";

export interface UpdateUserPasswordRequest extends AuthRequest {
  body: {
    old_password: string;
    password: string;
    password_confirmation: string;
  };
}

function validateUserPassword(password: string, user: User) {
  return bcrypt.compareSync(password, user.password);
}

const validate: Validate = (request: AuthRequest) => {
  const { user } = request.auth as Auth;

  /* create schema */
  let schema = z.object({
    old_password: z
      .string()
      .min(8)
      .refine((password) => validateUserPassword(password, user), {
        message: "Old Password is not correct",
      }),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
  });

  /* Add password confirmation rules */
  schema.refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Password and Password confirmation does not match",
  });

  schema.refine((data) => data.old_password !== data.password, {
    path: ["password"],
    message: "The old password and the new password must not match",
  });

  /* validate schema */
  return schema.safeParse(request.body);
};

export default {
  validate,
};
