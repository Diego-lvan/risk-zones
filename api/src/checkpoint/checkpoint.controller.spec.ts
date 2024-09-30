import { Test, TestingModule } from '@nestjs/testing';
import { CheckpointController } from './checkpoint.controller';
import { CheckpointService } from './checkpoint.service';

describe('CheckpointController', () => {
  let controller: CheckpointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckpointController],
      providers: [CheckpointService],
    }).compile();

    controller = module.get<CheckpointController>(CheckpointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
