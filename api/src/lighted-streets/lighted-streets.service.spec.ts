import { Test, TestingModule } from '@nestjs/testing';
import { LightedStreetsService } from './lighted-streets.service';

describe('LightedStreetsService', () => {
  let service: LightedStreetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LightedStreetsService],
    }).compile();

    service = module.get<LightedStreetsService>(LightedStreetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
