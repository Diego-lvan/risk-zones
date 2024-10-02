import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Coordinate } from 'src/risk-zones/interfaces/coordinate';

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  date: Date;

  @ValidateNested()
  point: Coordinate;

  @IsString()
  @IsNotEmpty()
  user: string;
}
