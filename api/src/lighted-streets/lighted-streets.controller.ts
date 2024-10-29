import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { LightedStreetsService } from './lighted-streets.service';

@Controller('lighted-streets')
@ApiTags('Lighted Streets')
export class LightedStreetsController {
  constructor(private readonly lightedStreetsService: LightedStreetsService) {}

  @Get('')
  @ApiQuery({ name: 'latitude', type: Number })
  @ApiQuery({ name: 'longitude', type: Number })
  @ApiQuery({ name: 'radius', type: Number })
  async getLightedStreets(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radius') radius: number,
  ) {
    return this.lightedStreetsService.getLightedStreets(latitude, longitude, radius);
  }
}
