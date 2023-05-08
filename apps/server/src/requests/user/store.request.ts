import { z } from 'zod'
import { Authorize, Validate } from '../../interfaces/Request'
import { User as IUser } from '../../interfaces/User'
import User from '../../models/User'
import { Request } from 'express'

export interface StoreRequest extends Request {
  body: {
    firstName: string
    lastName: string
    email: string
    password: string
    isAdmin: boolean
    verifiedAt: string | null
    address: string
    phone: string
    gender: string
    birthDay: string
  }
}

const authorize: Authorize = (user?: IUser) => {
  return user && user.isAdmin
}

const validate: Validate = async (request: Request) => {
  const schema = z
    .object({
      firstName: z.string().min(3).max(60),
      lastName: z.string().min(3).max(60),
      email: z
        .string()
        .email()
        .refine(
          async (email) => {
            return !(await User.exists({ email }))
          },
          { message: 'Email address is already taken' },
        ),
      password: z.string().min(8),
      password_confirmation: z.string().min(8),
      isAdmin: z.boolean().default(false),
      verifiedAt: z.string().datetime().nullable().default(null),
      phone: z.string().max(255),
      address: z.string().min(8).max(255),
      gender: z.enum(['M', 'F']),
      birthDay: z.string().datetime(),
    })
    .refine(({ password_confirmation, password }) => password === password_confirmation, {
      path: ['password_confirmation'],
      message: 'Password and Password confirmation does not exists',
    })

  return await schema.safeParseAsync(request.body)
}

export default {
  authorize,
  validate,
}
