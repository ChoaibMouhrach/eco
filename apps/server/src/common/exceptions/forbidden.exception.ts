import { HttpStatus } from '../enums';
import { HttpException } from './http.exception';

/**
 * Defines an HTTP exception for *Forbidden* type errors.
 */
export class ForbiddenException extends HttpException {
  /**
   * Instantiate a `ForbiddenException` Exception.
   *
   * @example
   * `throw new ForbiddenException()`
   *
   * @param objectOrError string or object describing the error condition.
   * @param description string describing the error condition.
   */
  constructor(objectOrError?: string | Record<string, any> | any, description = 'Forbidden') {
    super(
      HttpException.createBody(objectOrError, description, HttpStatus.FORBIDDEN),
      HttpStatus.FORBIDDEN,
    );
  }
}
