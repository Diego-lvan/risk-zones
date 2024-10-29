import { Module } from '@nestjs/common';
import { LightingReportService } from './lighting-report.service';
import { LightingReportController } from './lighting-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LightingReport } from './entities/lighting-report.entity';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([LightingReport, User]), UserModule],
  controllers: [LightingReportController],
  providers: [LightingReportService],
})
export class LightingReportModule {}
