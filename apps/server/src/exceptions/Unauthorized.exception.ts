import { HttpException } from "./http.exception";

export class UnauthorizedException extends HttpException {
  constructor() {
    super({
      error: "Unauthorized",
      statusCode: 401,
      content: "Unauthorized",
    });
  }
}
