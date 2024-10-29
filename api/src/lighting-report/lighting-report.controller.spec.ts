import { Test, TestingModule } from '@nestjs/testing';
import { LightingReportController } from './lighting-report.controller';
import { LightingReportService } from './lighting-report.service';

describe('LightingReportController', () => {
  let controller: LightingReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LightingReportController],
      providers: [LightingReportService],
    }).compile();

    controller = module.get<LightingReportController>(LightingReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
