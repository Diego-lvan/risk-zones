import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateCheckpointDto {
  @IsString()
  name: string;
  @IsNumber()
  @Max(90)
  @Min(-90)
  latitude: number;
  @IsNumber()
  @Max(180)
  @Min(-180)
  longitude: number;
  @IsString()
  userId: string;
}
