import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateCheckpointDto {
  @ApiProperty({ description: 'Name of the checkpoint', example: 'Checkpoint 1' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Latitude of the checkpoint', example: 40.416775 })
  @IsNumber()
  @Max(90)
  @Min(-90)
  latitude: number;

  @ApiProperty({ description: 'Longitude of the checkpoint', example: -3.70379 })
  @IsNumber()
  @Max(180)
  @Min(-180)
  longitude: number;

  @ApiProperty({ description: 'User id that made the checkpoint' })
  @IsString()
  userId: string;
}
