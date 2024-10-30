import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class CreateLightingReportDto {
  @ApiProperty({ description: 'Punto de inicio del reporte de iluminación' })
  @ValidateNested()
  startCoords: {
    latitude: number;
    longitude: number;
  };

  @ApiProperty({ description: 'Punto final del reporte de iluminación' })
  @ValidateNested()
  endCoords: {
    latitude: number;
    longitude: number;
  };

  @ApiProperty({ description: 'Fecha de publicación en formato personalizado', example: 'DD/MM/YYYY' })
  @IsNotEmpty()
  created_at: Date;

  @ApiProperty({ description: 'User id that made the lighting report' })
  @IsString()
  @IsNotEmpty()
  user: string;
}
