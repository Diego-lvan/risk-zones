import { Module } from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { CheckpointController } from './checkpoint.controller';

@Module({
  controllers: [CheckpointController],
  providers: [CheckpointService],
})
export class CheckpointModule {}
