import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class SendNotificationReqDto {
  @ApiProperty()
  @IsNumber()
  checkpointId: number;

  @ApiProperty()
  @IsString()
  @Length(10, 10)
  contactPhone: string;

  @ApiProperty()
  userId: string;
}
