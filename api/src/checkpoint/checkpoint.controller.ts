import { Controller, Post, Body, Get, Param, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { SendNotificationReqDto } from './dto/send-notification-req-dto';

/**
 * Controller for handling checkpoint-related operations.
 * This controller manages the creation of checkpoints, notification of checkpoint passage,
 * and retrieval of checkpoints for a specific user.
 */
@Controller('checkpoint')
@ApiTags('checkpoint')
export class CheckpointController {
  constructor(private readonly checkpointService: CheckpointService) {}

  /**
   * Creates a new checkpoint.
   * @param createCheckpointDto - The data transfer object containing checkpoint creation details.
   * @returns The created checkpoint object.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new checkpoint' })
  @ApiBody({ type: CreateCheckpointDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Checkpoint created successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  async create(@Body() createCheckpointDto: CreateCheckpointDto) {
    return this.checkpointService.create(createCheckpointDto);
  }

  /**
   * Sends a notification when a checkpoint is passed.
   * @param sendNotificationReqDto - The data transfer object containing notification details.
   * @returns An object with a success message.
   * @throws HttpException if there's an error during the notification process.
   */
  @Post('notify')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Send notification for checkpoint passage' })
  @ApiBody({ type: SendNotificationReqDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Notification sent successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found or checkpoint not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Could not send notification, invalid phone' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  async notifyCheckpointPassed(@Body() sendNotificationReqDto: SendNotificationReqDto) {
    try {
      await this.checkpointService.notifyCheckpointPassed(sendNotificationReqDto);
      return { message: 'Notification sent successfully' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Retrieves all checkpoints for a specific user.
   * @param id - The ID of the user.
   * @returns An array of checkpoint objects associated with the user.
   */
  @Get('user/:id')
  @ApiOperation({ summary: 'Get all checkpoints for a user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns all checkpoints for a user' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  findAll(@Param('id') id: string) {
    return this.checkpointService.findAllByUser(id);
  }
}
