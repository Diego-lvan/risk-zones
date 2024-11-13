import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

/**
 * Data Transfer Object for creating a lighting rating.
 * This class is used to validate and transfer data related to the rating of a lighted street.
 */
export class LightedStreetRatingDto {
  @ApiProperty({ description: 'Street id to rate' })
  @IsString()
  @IsNotEmpty()
  streetId: string; // The ID of the street being rated

  @ApiProperty({ description: 'User id that rate the street' })
  @IsString()
  @IsNotEmpty()
  userId: string; // The ID of the user who is rating the street

  @ApiProperty({ description: 'Rating of the lighted street', example: 3.5 })
  @IsNumber()
  @Max(5)
  @Min(0)
  rating: number; // The rating given to the street, ranging from 0 to 5
}
