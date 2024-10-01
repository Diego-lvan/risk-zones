import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';

@Controller('checkpoint')
export class CheckpointController {
  constructor(private readonly checkpointService: CheckpointService) {}

  @Post()
  create(@Body() createCheckpointDto: CreateCheckpointDto) {
    return this.checkpointService.create(createCheckpointDto);
  }

  @Get('user/:id')
  findAll(@Param('id') id: string) {
    return this.checkpointService.findAllByUser(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkpointService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckpointDto: UpdateCheckpointDto) {
    return this.checkpointService.update(+id, updateCheckpointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkpointService.remove(+id);
  }
}
