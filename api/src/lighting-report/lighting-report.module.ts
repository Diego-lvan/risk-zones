import { Module } from '@nestjs/common';
import { LightingReportService } from './lighting-report.service';
import { LightingReportController } from './lighting-report.controller';

@Module({
  controllers: [LightingReportController],
  providers: [LightingReportService],
})
export class LightingReportModule {}
