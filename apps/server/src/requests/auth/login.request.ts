import { z } from 'zod'
import { Request } from 'express'
import User from '../../models/User'

export interface LoginRequest extends Request {
  body: {
    email: string
    password: string
  }
}

const validate = async (request: Request) => {
  const schema = z.object({
    email: z
      .string()
      .email()
      .refine(
        async (email) => {
          const user = await User.findOne({ email })
          return user && !user.deletedAt
        },
        { message: 'Email Address does not exists' },
      ),
    password: z.string().min(8),
  })

  return schema.safeParseAsync(request.body)
}

export default {
  validate,
}
