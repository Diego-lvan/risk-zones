import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SendNotificationReqDto } from './dto/send-notification-req-dto';

@Controller('checkpoint')
@ApiTags('checkpoint')
export class CheckpointController {
  constructor(private readonly checkpointService: CheckpointService) {}

  @Post()
  create(@Body() createCheckpointDto: CreateCheckpointDto) {
    return this.checkpointService.create(createCheckpointDto);
  }

  @Post('notify')
  @ApiBody({ type: SendNotificationReqDto })
  async notifyCheckpointPassed(@Body() sendNotificationReqDto: SendNotificationReqDto) {
    try {
      await this.checkpointService.notifyCheckpointPassed(sendNotificationReqDto);
    } catch (e) {
      return e;
    }
  }

  @Get('user/:id')
  findAll(@Param('id') id: string) {
    return this.checkpointService.findAllByUser(id);
  }
}

// 3e36bd07-4714-4527-8c43-2d17144e5914
