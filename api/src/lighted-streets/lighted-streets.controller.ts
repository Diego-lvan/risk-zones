import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LightedStreetsService } from './lighted-streets.service';
import { CreateLightingReportDto } from './dto/create-lighting-report.dto';
import { LightedStreetRatingDto } from './dto/create-lighting-rating.dto';

@Controller('lighted-streets')
@ApiTags('Lighted Streets')
export class LightedStreetsController {
  constructor(private readonly lightedStreetsService: LightedStreetsService) {}

  /**
   * Get lighted streets within a certain radius of a given location.
   * @param latitude - The latitude of the location.
   * @param longitude - The longitude of the location.
   * @param radius - The radius within which to search for lighted streets.
   * @returns A list of lighted streets within the specified radius.
   */
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

  /**
   * Create a new lighting report.
   * @param createLightingReportDto - The data transfer object containing the details of the lighting report.
   * @returns The created lighting report.
   */
  @Post()
  create(@Body() createLightingReportDto: CreateLightingReportDto) {
    return this.lightedStreetsService.createLightingReport(createLightingReportDto);
  }

  /**
   * Rate a lighted street.
   * @param lightedStreetRatingDto - The data transfer object containing the rating details.
   * @returns A confirmation message indicating the rating was successful.
   */
  @Post('/rate')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Rate a lighted street' })
  @ApiBody({ type: LightedStreetRatingDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Lighted street rated successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  async rateLightedStreet(@Body() lightedStreetRatingDto: LightedStreetRatingDto) {
    return this.lightedStreetsService.rateLightedStreet(lightedStreetRatingDto);
  }

  /**
   * Find a specific lighted street by its ID.
   * @param id - The ID of the lighted street.
   * @returns The details of the lighted street.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lightedStreetsService.findOne(id);
  }

  /**
   * Remove a lighted street by its ID.
   * @param id - The ID of the lighted street to remove.
   * @returns A confirmation message indicating the removal was successful.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lightedStreetsService.remove(+id);
  }
}
