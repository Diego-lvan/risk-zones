import { HttpException, HttpStatus } from '@nestjs/common';

export class CheckPointNotFound extends HttpException {
  constructor() {
    super('The checkpoint does not exist', HttpStatus.BAD_REQUEST);
  }
}
