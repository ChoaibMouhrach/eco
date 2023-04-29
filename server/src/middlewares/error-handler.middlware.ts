import { HttpException } from "../common/exceptions";

export function errorHandler(error: any, _request: any, response: any, _next: any) {
  if (error instanceof HttpException) {
    response.status(error.getStatus()).json(error.getResponse());
  } else {
    response.status(500).json(HttpException.createBody(error.message, "Internal Server Error", 500));
  }
}
