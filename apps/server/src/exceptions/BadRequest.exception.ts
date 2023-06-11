import { HttpException } from "./http.exception";

export class BadRequestException extends HttpException {
  public constructor(content: any) {
    super({ content, error: "Bad Request", statusCode: 400 });
  }
}
