import { Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SendNotificationReqDto } from './dto/send-notification-req-dto';
import { Response } from 'express';

@Controller('checkpoint')
@ApiTags('checkpoint')
export class CheckpointController {
  constructor(private readonly checkpointService: CheckpointService) {}

  @Post()
  @ApiBody({ type: CreateCheckpointDto })
  async create(@Body() createCheckpointDto: CreateCheckpointDto) {
    return this.checkpointService.create(createCheckpointDto);
  }

  @Post('notify')
  @ApiResponse({ status: 201, description: 'Notification sent successfully' })
  @ApiResponse({ status: 404, description: 'User not found or checkpoint not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 400, description: 'Could not send notification, invalid phone' })
  @ApiBody({ type: SendNotificationReqDto })
  async notifyCheckpointPassed(@Body() sendNotificationReqDto: SendNotificationReqDto, @Res() res: Response) {
    try {
      await this.checkpointService.notifyCheckpointPassed(sendNotificationReqDto);
      return res.status(201).json({ message: 'Notification sent successfully' });
    } catch (e: any) {
      throw e;
    }
  }

  @Get('user/:id')
  findAll(@Param('id') id: string) {
    return this.checkpointService.findAllByUser(id);
  }
}
