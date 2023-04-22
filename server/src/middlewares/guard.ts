import { NextFunction, Response } from "express";
import { AuthRequest } from "../interfaces/User";
import { Authorize, Validate } from "../interfaces/Request";

export const guard = ({ authorize, validate }: { authorize?: Authorize; validate?: Validate }) => {
  return async (request: AuthRequest, response: Response, next: NextFunction) => {
    if (authorize && !Boolean(authorize(request.auth?.user))) {
      return response.status(403).json({
        message: "Permission required",
      });
    }

    if (validate) {
      const validation = await validate(request);
      if (!validation.success) {
        return response.status(400).json({ errors: validation.error.issues });
      }
    }

    return next();
  };
};
