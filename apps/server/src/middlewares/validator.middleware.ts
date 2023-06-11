import { BadRequestException, UnauthorizedException } from "@src/exceptions";
import { NextFunction, Request, Response } from "express";
import { Authorize, Validate } from "..";

interface ValidatorParams {
  validate?: Validate;
  authorize?: Authorize;
}

export const validator = ({ validate, authorize }: ValidatorParams) => {
  return async (request: Request, _response: Response, next: NextFunction) => {
    if (authorize) {
      const { authorized, reason } = await authorize(request);

      if (!authorized) {
        throw new UnauthorizedException(reason);
      }
    }

    if (validate) {
      const validation = await validate(request.body);

      if (validation.success) {
        request.body = validation.data;
      } else {
        throw new BadRequestException(validation.error.issues);
      }
    }

    return next();
  };
};
