import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LightedStreetsService } from './lighted-streets.service';
import { CreateLightingReportDto } from './dto/create-lighting-report.dto';
import { LightedStreetRatingDto } from './dto/create-lighting-rating.dto';

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

  @Post('/rate')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Rate a lighted street' })
  @ApiBody({ type: LightedStreetRatingDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Lighted street rated successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  async rateLightedStreet(@Body() lightedStreetRatingDto: LightedStreetRatingDto) {
    return this.lightedStreetsService.rateLightedStreet(lightedStreetRatingDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lightedStreetsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lightedStreetsService.remove(+id);
  }
}
