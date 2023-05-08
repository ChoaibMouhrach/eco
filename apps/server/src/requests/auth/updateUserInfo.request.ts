import { z } from 'zod'
import { Validate } from '../../interfaces/Request'
import User from '../../models/User'
import { Request } from 'express'
import { AuthRequest } from '../../interfaces/User'

export interface UpdateUserInfoRequest extends AuthRequest {
  body: {
    firstName?: string
    lastName?: string
    email?: string
    password: string
    address?: string
    gender?: string
    phone?: string
    birthDay: string
  }
}

const validate: Validate = (request: Request) => {
  return z
    .object({
      firstName: z.string().min(3).max(60).optional(),
      lastName: z.string().min(3).max(60).optional(),
      address: z.string().min(8).max(255).optional(),
      phone: z.string().max(255).optional(),
      birthDay: z.string().datetime().optional(),
      gender: z.enum(['f', 'm']).optional(),
      email: z
        .string()
        .email()
        .refine(
          async (email) => {
            return !(await User.exists({ email }))
          },
          { message: 'Email Address is already taken' },
        )
        .optional(),
      password: z.string().min(8),
    })
    .safeParseAsync(request.body)
}

export default {
  validate,
}
