import { HttpException, HttpStatus } from '@nestjs/common';

export class NotificationNotSent extends HttpException {
  constructor() {
    super('Could not send notification', HttpStatus.BAD_REQUEST);
  }
}
