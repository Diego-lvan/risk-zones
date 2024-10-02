import { Controller, Post, Body } from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('checkpoint')
@ApiTags('Checkpoint')
export class CheckpointController {
  constructor(private readonly checkpointService: CheckpointService) {}

  @Post()
  @ApiBody({ type: CreateCheckpointDto })
  create(@Body() createCheckpointDto: CreateCheckpointDto) {
    return this.checkpointService.create(createCheckpointDto);
  }
}
