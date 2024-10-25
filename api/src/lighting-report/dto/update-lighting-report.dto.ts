import { PartialType } from '@nestjs/swagger';
import { CreateLightingReportDto } from './create-lighting-report.dto';

export class UpdateLightingReportDto extends PartialType(CreateLightingReportDto) {}
