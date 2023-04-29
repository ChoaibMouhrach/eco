import { HttpStatus } from "../enums";
import { HttpException } from "./http.exception";

/**
 * Defines an HTTP exception for *Unauthorized* type errors.
 */
export class UnauthorizedException extends HttpException {
  /**
   * Instantiate an `UnauthorizedException` Exception.
   *
   * @example
   * `throw new UnauthorizedException()`
   *
   * @param objectOrError string or object describing the error condition.
   * @param description string describing the error condition.
   */
  constructor(objectOrError?: string | Record<string, any> | any, description = "Unauthorized") {
    super(HttpException.createBody(objectOrError, description, HttpStatus.UNAUTHORIZED), HttpStatus.UNAUTHORIZED);
  }
}
