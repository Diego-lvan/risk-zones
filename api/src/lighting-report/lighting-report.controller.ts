import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { LightingReportService } from './lighting-report.service';
import { CreateLightingReportDto } from './dto/create-lighting-report.dto';

@Controller('lighting-report')
export class LightingReportController {
  constructor(private readonly lightingReportService: LightingReportService) {}

  @Post()
  create(@Body() createLightingReportDto: CreateLightingReportDto) {
    return this.lightingReportService.createLightingReport(createLightingReportDto);
  }

  @Get()
  findAll() {
    return this.lightingReportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lightingReportService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lightingReportService.remove(+id);
  }
}
