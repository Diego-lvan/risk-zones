import { HttpException, HttpStatus } from '@nestjs/common';

export class CheckPointNotFound extends HttpException {
  constructor() {
    super('The checkpoint does not exist', HttpStatus.NOT_FOUND);
  }
}
