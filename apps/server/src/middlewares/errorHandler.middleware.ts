import { HttpException, UnauthorizedException } from "@src/exceptions";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: any,
  _request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  if (error instanceof HttpException) {
    if (
      error instanceof UnauthorizedException &&
      error.content !== "jwt expired"
    ) {
      response.cookie("refreshToken", "", {
        maxAge: 0,
        path: "/",
      });
      response.cookie("accessToken", "", {
        maxAge: 0,
        path: "/",
      });
    }

    return response.status(error.statusCode).json(error.getBody());
  }

  const statusCode = 500;

  console.log(error);

  return response.status(statusCode).json({
    statusCode,
    content: {
      message: "something went wrong",
    },
    error: "Internal Server Error",
  });
};
