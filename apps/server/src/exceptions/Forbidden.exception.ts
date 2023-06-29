import { HttpException } from "./http.exception";

export class ForbiddenException extends HttpException {
  public constructor(content: any) {
    super({
      statusCode: 403,
      error: "Forbidden",
      content,
    });
  }
}
