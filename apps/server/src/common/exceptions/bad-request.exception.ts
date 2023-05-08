import { HttpStatus } from '../enums/http-status.enum'
import { HttpException } from './http.exception'

/**
 * Defines an HTTP exception for ***Bad Request*** type errors.
 */
export class BadRequestException extends HttpException {
  /**
   * Instantiate a `BadRequestException` Exception.
   *
   * @example
   * `throw new BadRequestException()`
   *
   * @param objectOrError string or object describing the error condition.
   * @param description string describing the error condition.
   */
  constructor(objectOrError?: string | Record<string, any> | any, description = 'Bad Request') {
    super(
      HttpException.createBody(objectOrError, description, HttpStatus.BAD_REQUEST),
      HttpStatus.BAD_REQUEST,
    )
  }
}
