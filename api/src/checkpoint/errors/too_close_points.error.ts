import { HttpException, HttpStatus } from '@nestjs/common';
import { MINIMUM_DISTANCE_BETWEEN_CHECKPOINTS } from '../constants/checkpoint.constants';

export class TooClosePointsError extends HttpException {
  constructor() {
    super(
      `El checkpoint está a menos de ${MINIMUM_DISTANCE_BETWEEN_CHECKPOINTS} metros de otro ya creado`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
