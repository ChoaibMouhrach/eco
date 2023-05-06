import { Request } from "express"
import { Authorize, Validate } from "../../interfaces/Request"
import { User as IUser } from "../../interfaces/User"
import { z } from "zod"
import User from "../../models/User"

export interface UpdateRequest extends Request {
  body: {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
    isAdmin?: boolean;
    verifiedAt?: string;
    address?: string;
    gender?: string;
    phone?: string;
    birthDay: string
  }
}

const authorize: Authorize = (user?: IUser) => {
  return user && user.isAdmin
}

const validate: Validate = (request: Request) => {

  const schema = z.object({
    firstName: z.string().min(3).max(60).optional(),
    lastName: z.string().min(3).max(60).optional(),
    email: z.string().email().refine(async (email) => {
      return !(await User.findOne({ email }))
    }, { message: "User not found" }).optional(),
    password: z.string().min(8).optional(),
    password_confirmation: z.string().min(8).optional(),
    isAdmin: z.boolean().optional(),
    verifiedAt: z.string().datetime().optional(),
    address: z.string().max(255).optional(),
    phone: z.string().max(255).optional(),
    gender: z.enum(["f", "m"]).optional(),
    birthDay: z.string().datetime().optional()
  })
    .refine(({ password, password_confirmation }) => {
      if (password || password_confirmation) {
        return password === password_confirmation
      }
      return true
    }, { message: "Password and password_confirmation does not match" })

  return schema.safeParseAsync(request.body)

}

export default {
  authorize,
  validate
}
