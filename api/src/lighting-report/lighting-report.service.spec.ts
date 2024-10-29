import { Test, TestingModule } from '@nestjs/testing';
import { LightingReportService } from './lighting-report.service';

describe('LightingReportService', () => {
  let service: LightingReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LightingReportService],
    }).compile();

    service = module.get<LightingReportService>(LightingReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
