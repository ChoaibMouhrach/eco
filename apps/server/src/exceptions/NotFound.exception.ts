import { HttpException } from "./http.exception";

export class NotFoundException extends HttpException {
  public constructor(content: any) {
    super({ error: "Not Found", content, statusCode: 404 });
  }
}
