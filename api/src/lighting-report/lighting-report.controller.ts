import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LightingReportService } from './lighting-report.service';
import { CreateLightingReportDto } from './dto/create-lighting-report.dto';
import { UpdateLightingReportDto } from './dto/update-lighting-report.dto';

@Controller('lighting-report')
export class LightingReportController {
  constructor(private readonly lightingReportService: LightingReportService) {}

  @Post()
  create(@Body() createLightingReportDto: CreateLightingReportDto) {
    return this.lightingReportService.create(createLightingReportDto);
  }

  @Get()
  findAll() {
    return this.lightingReportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lightingReportService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLightingReportDto: UpdateLightingReportDto) {
    return this.lightingReportService.update(+id, updateLightingReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lightingReportService.remove(+id);
  }
}
