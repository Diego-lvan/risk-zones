import { Test, TestingModule } from '@nestjs/testing';
import { LightedStreetsController } from './lighted-streets.controller';
import { LightedStreetsService } from './lighted-streets.service';

describe('LightedStreetsController', () => {
  let controller: LightedStreetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LightedStreetsController],
      providers: [LightedStreetsService],
    }).compile();

    controller = module.get<LightedStreetsController>(LightedStreetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
