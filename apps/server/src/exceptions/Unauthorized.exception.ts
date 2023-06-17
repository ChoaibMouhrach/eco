import { HttpException } from "./http.exception";

export class UnauthorizedException extends HttpException {
  constructor(content: any) {
    super({
      error: "Unauthorized",
      statusCode: 401,
      content,
    });
  }
}
