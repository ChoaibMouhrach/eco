/**
 * @param response string, object describing the error condition or the error cause.
 * @param status HTTP response status code.
 */
export class HttpException extends Error {
  constructor(
    private readonly response: string | Record<string, any>,
    private readonly status: number,
  ) {
    super()
    this.setMessage()
    this.setName()
  }

  public setMessage() {
    if (typeof this.response === 'string') {
      this.message = this.response
    } else if (
      typeof this.response === 'object' &&
      typeof (this.response as Record<string, any>).message === 'string'
    ) {
      this.message = (this.response as Record<string, any>).message
    } else if (this.constructor) {
      this.message = this.constructor.name
    }
  }

  public setName() {
    this.name = this.constructor.name
  }

  public getResponse() {
    return this.response
  }

  public getStatus() {
    return this.status
  }

  public static createBody(
    objectOrErrorMessage: object | string,
    description?: string,
    statusCode?: number,
  ) {
    if (!objectOrErrorMessage) {
      return { statusCode, message: description }
    }
    return typeof objectOrErrorMessage === 'object' && !Array.isArray(objectOrErrorMessage)
      ? objectOrErrorMessage
      : { statusCode, message: objectOrErrorMessage, error: description }
  }
}
