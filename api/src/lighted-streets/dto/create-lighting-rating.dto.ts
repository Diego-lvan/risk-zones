import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class LightedStreetRatingDto {
  @ApiProperty({ description: 'Street id to rate' })
  @IsString()
  @IsNotEmpty()
  streetId: string;

  @ApiProperty({ description: 'User id that rate the street' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Rating of the lighted street', example: 3.5 })
  @IsNumber()
  @Max(5)
  @Min(0)
  rating: number;
}
