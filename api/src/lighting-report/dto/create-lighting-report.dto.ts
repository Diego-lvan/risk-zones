import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { Point } from 'typeorm';

export class CreateLightingReportDto {
  @ApiProperty({ description: 'Título del reporte de iluminación' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Contenido del reporte de iluminación' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: 'Punto de inicio del reporte de iluminación' })
  @ValidateNested()
  startPoint: Point;

  @ApiProperty({ description: 'Punto final del reporte de iluminación' })
  @ValidateNested()
  endPoint: Point;

  @ApiProperty({ description: 'Fecha de publicación en formato personalizado', example: 'DD/MM/YYYY' })
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ description: 'User id that made the lighting report' })
  @IsString()
  @IsNotEmpty()
  user: User;
}
