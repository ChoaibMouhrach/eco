import { HttpException } from './http.exception';
import { HttpStatus } from '../enums/http-status.enum';

/**
 * Defines an HTTP exception for ***Not Found*** type errors.
 */
export class NotFoundException extends HttpException {
  /**
   * Instantiate a `NotFoundException` Exception.
   *
   * @example
   * `throw new NotFoundException()`
   *
   * @param objectOrError string or object describing the error condition.
   * @param description string describing the error condition.
   */
  constructor(objectOrError?: string | Record<string, any> | any, description = 'Not Found') {
    super(
      HttpException.createBody(objectOrError, description, HttpStatus.NOT_FOUND),
      HttpStatus.NOT_FOUND,
    );
  }
}
