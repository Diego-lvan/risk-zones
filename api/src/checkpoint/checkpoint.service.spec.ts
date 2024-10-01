import { Test, TestingModule } from '@nestjs/testing';
import { CheckpointService } from './checkpoint.service';

describe('CheckpointService', () => {
  let service: CheckpointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckpointService],
    }).compile();

    service = module.get<CheckpointService>(CheckpointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
