import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
//import { Coordinate } from 'src/risk-zones/interfaces/coordinate';

export class CreateNewsDto {
  @ApiProperty({ description: 'Título de la noticia' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Contenido de la noticia' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: 'Fecha de publicación en formato personalizado', example: 'DD/MM/YYYY' })
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ description: 'Coordenadas del punto asociado a la noticia' })
  @ValidateNested()
  point: {
    latitude: number;
    longitude: number;
  };

  @ApiProperty({ description: 'User id that made the news' })
  @IsString()
  @IsNotEmpty()
  user: string;
}
