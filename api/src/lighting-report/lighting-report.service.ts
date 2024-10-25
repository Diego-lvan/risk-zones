import { Injectable } from '@nestjs/common';
import { CreateLightingReportDto } from './dto/create-lighting-report.dto';
import { UpdateLightingReportDto } from './dto/update-lighting-report.dto';

@Injectable()
export class LightingReportService {
  create(createLightingReportDto: CreateLightingReportDto) {
    return 'This action adds a new lightingReport';
  }

  findAll() {
    return `This action returns all lightingReport`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lightingReport`;
  }

  update(id: number, updateLightingReportDto: UpdateLightingReportDto) {
    return `This action updates a #${id} lightingReport`;
  }

  remove(id: number) {
    return `This action removes a #${id} lightingReport`;
  }
}
