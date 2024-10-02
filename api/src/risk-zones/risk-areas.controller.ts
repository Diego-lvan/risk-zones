import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { RiskAreasService } from './riskareas.service';

@Controller('risk-areas')
@ApiTags('Risk Areas')
export class RiskAreasController {
  constructor(private readonly riskAreasService: RiskAreasService) {}

  @Get('')
  @ApiQuery({ name: 'longitude', type: Number })
  @ApiQuery({ name: 'latitude', type: Number })
  @ApiQuery({ name: 'radius', type: Number })
  async findPoints(
    @Query('longitude') longitude: number,
    @Query('latitude') latitude: number,
    @Query('radius') radius: number,
  ) {
    return this.riskAreasService.findPoints(longitude, latitude, radius);
  }
}
