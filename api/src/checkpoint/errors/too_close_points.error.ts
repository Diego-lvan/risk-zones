import { HttpException, HttpStatus } from "@nestjs/common";

export class TooClosePointsError extends HttpException {
  constructor() {
    super('The checkpoint is too close to another checkpoint', HttpStatus.BAD_REQUEST);
  }
}