interface HttpExceptionConstructor {
  statusCode: number;
  content: any;
  error: string;
}

export abstract class HttpException extends Error {
  public statusCode: number;

  public content: any;

  public error: string;

  public constructor({ statusCode, content, error }: HttpExceptionConstructor) {
    super();

    this.statusCode = statusCode;
    this.content = content;
    this.error = error;
  }

  public getBody() {
    return {
      statusCode: this.statusCode,
      content: typeof this.content === "string" ? { message: this.content } : this.content,
      error: this.error,
    };
  }
}
