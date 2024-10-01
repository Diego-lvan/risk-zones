import { Module } from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { CheckpointController } from './checkpoint.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkpoint } from './entities/checkpoint.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Checkpoint]), UserModule],
  controllers: [CheckpointController],
  providers: [CheckpointService],
})
export class CheckpointModule {}
