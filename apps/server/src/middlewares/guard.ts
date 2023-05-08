import { NextFunction, Response } from 'express'
import { AuthRequest } from '../interfaces/User'
import { Authorize, Validate } from '../interfaces/Request'
import { BadRequestException, ForbiddenException } from '../common'

export const guard = ({ authorize, validate }: { authorize?: Authorize; validate?: Validate }) => {
  return async (request: AuthRequest, _response: Response, next: NextFunction) => {
    if (authorize && !authorize(request.auth?.user)) {
      throw new ForbiddenException('Permission required')
    }

    if (validate) {
      const validation = await validate(request)
      if (!validation.success) {
        throw new BadRequestException(validation.error.issues)
      }
      if (validation.success) {
        request.body = validation.data
      }
    }

    return next()
  }
}
