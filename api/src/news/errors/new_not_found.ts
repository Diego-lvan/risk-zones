import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Error thrown when a new is not found
 * @class NewNotFoundError
 */
export class NewNotFoundError extends HttpException {
  constructor() {
    super('New not found', HttpStatus.NOT_FOUND);
  }
}
