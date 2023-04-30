import { HttpStatus } from "../enums";
import { HttpException } from "./http.exception";

/**
 * Defines an HTTP exception for ***Not Found*** type errors.
 */
export class TooManyRequestsException extends HttpException {

  /**
   * Instantiate a `TooManyRequestsException` Exception.
   *
   * @example
   * `throw new TooManyRequestsException()`
   *
   * @param objectOrError string or object describing the error condition.
   * @param description string describing the error condition.
   */
  constructor(objectOrError?: string | Record<string, any> | any, description = "Too many requests") {
    super(HttpException.createBody(objectOrError, description, HttpStatus.TOO_MANY_REQUESTS), HttpStatus.TOO_MANY_REQUESTS)
  }
}

