import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { LightedStreetsService } from './lighted-streets.service';
import { CreateLightingReportDto } from './dto/create-lighting-report.dto';

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

  @Post()
  create(@Body() createLightingReportDto: CreateLightingReportDto) {
    return this.lightedStreetsService.createLightingReport(createLightingReportDto);
  }

  @Get()
  findAll() {
    return this.lightedStreetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lightedStreetsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lightedStreetsService.remove(+id);
  }
}
