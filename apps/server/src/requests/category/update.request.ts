import { Request } from 'express';
import { User } from '../../interfaces/User';
import { z } from 'zod';

export interface UpdateRequest extends Request {
  body: {
    name?: string;
  };
}

const authorize = (user?: User) => {
  return Boolean(user && user.isAdmin && user.verifiedAt);
};

const validate = (request: Request) => {
  return z
    .object({
      name: z.string().min(3).max(60).optional(),
    })
    .safeParse(request.body);
};

export default {
  authorize,
  validate,
};
