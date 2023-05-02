import { z } from "zod";
import { Validate } from "../../interfaces/Request";
import { Request } from "express";

export interface ForgotPasswordRequest extends Request {
  body: {
    email: string;
  };
}

const validate: Validate = async (request: Request) => {
  const schema = z.object({
    email: z.string().email()
  })

  return schema.safeParse(request.body)
};

export default {
  validate,
};
