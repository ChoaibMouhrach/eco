import { HttpStatus } from '../enums';
import { HttpException } from './http.exception';

/**
 * Defines an HTTP exception for *Conflict* type errors.
 */
export class ConflictException extends HttpException {
  /**
   * Instantiate a `ConflictException` Exception.
   *
   * @example
   * `throw new ConflictException()`
   *
   * @param objectOrError string or object describing the error condition.
   * @param description string describing the error condition.
   */
  constructor(objectOrError?: string | Record<string, any> | any, description = 'Conflict') {
    super(
      HttpException.createBody(objectOrError, description, HttpStatus.CONFLICT),
      HttpStatus.CONFLICT,
    );
  }
}
