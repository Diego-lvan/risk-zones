import { Injectable } from '@nestjs/common';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Checkpoint } from './entities/checkpoint.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MINIMUM_DISTANCE_BETWEEN_CHECKPOINTS } from './constants/checkpoint.constants';
import { TooClosePointsError } from './errors/too_close_points.error';
import { SendNotificationReqDto } from './dto/send-notification-req-dto';
import { CheckPointNotFound } from './errors/checkpoint-not-found.error';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationNotSent } from './errors/notification-not-sent.error';

/**
 * Service responsible for handling checkpoint-related operations.
 */
@Injectable()
export class CheckpointService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Checkpoint)
    private readonly checkpointRepository: Repository<Checkpoint>,
    private readonly notificationService: NotificationService,
  ) {}

  /**
   * Creates a new checkpoint.
   * @param createCheckpointDto - The data transfer object containing checkpoint creation details.
   * @returns The created checkpoint object.
   * @throws TooClosePointsError if the new checkpoint is too close to existing ones.
   */
  async create(createCheckpointDto: CreateCheckpointDto): Promise<Checkpoint> {
    const user = await this.userService.findOne(createCheckpointDto.userId);
    const coordinates: any = {
      type: 'Point',
      coordinates: [createCheckpointDto.longitude, createCheckpointDto.latitude],
    };
    const checkpoint = this.checkpointRepository.create({
      name: createCheckpointDto.name,
      coords: coordinates,
      user,
    });

    if (!(await this.isAbleToMakeAPoint(checkpoint, user.id))) {
      throw new TooClosePointsError();
    }

    return this.checkpointRepository.save(checkpoint);
  }

  /**
   * Checks if a new checkpoint can be created at the given location.
   * @param checkpoint - The checkpoint to be created.
   * @param userId - The ID of the user creating the checkpoint.
   * @returns A boolean indicating whether the checkpoint can be created.
   */
  private async isAbleToMakeAPoint(checkpoint: Checkpoint, userId: string): Promise<boolean> {
    const points = await this.checkpointRepository
      .createQueryBuilder('checkpoint')
      .where(
        `
        ST_DWithin(
          ST_Transform(checkpoint.coords, 3857),
          ST_Transform(ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326), 3857),
          :distance
        )
      `,
      )
      .setParameters({
        longitude: checkpoint.coords.coordinates[0],
        latitude: checkpoint.coords.coordinates[1],
        distance: MINIMUM_DISTANCE_BETWEEN_CHECKPOINTS,
      })
      .andWhere('checkpoint.user = :userId')
      .setParameters({ userId })
      .getMany();

    return points.length === 0;
  }

  /**
   * Retrieves all checkpoints for a specific user.
   * @param id - The ID of the user.
   * @returns An array of checkpoint objects associated with the user.
   */
  async findAllByUser(id: string): Promise<Checkpoint[]> {
    const user = await this.userService.findOne(id);
    return this.checkpointRepository.find({ where: { user } });
  }

  /**
   * Finds a checkpoint by its ID.
   * @param id - The ID of the checkpoint.
   * @returns The checkpoint object if found, or null otherwise.
   */
  async findOne(id: number): Promise<Checkpoint | null> {
    return await this.checkpointRepository.findOneBy({ id });
  }

  /**
   * Sends a notification when a checkpoint is passed.
   * @param sendNotificationReqDto - The data transfer object containing notification details.
   * @throws CheckPointNotFound if the checkpoint is not found.
   * @throws NotificationNotSent if the notification fails to send.
   */
  async notifyCheckpointPassed(sendNotificationReqDto: SendNotificationReqDto): Promise<void> {
    const checkpoint = await this.findOne(sendNotificationReqDto.checkpointId);
    const user = await this.userService.findOne(sendNotificationReqDto.userId);
    if (!checkpoint) throw new CheckPointNotFound();
    try {
      await this.notificationService.sendNotification(
        sendNotificationReqDto.contactPhone,
        `User ${user.id} has passed through checkpoint ${checkpoint.name}`,
      );
    } catch (e) {
      throw new NotificationNotSent();
    }
  }

  async deleteCheckpoint(id: number): Promise<void> {
    const checkpoint = await this.checkpointRepository.findOneBy({ id });
    if (!checkpoint) throw new CheckPointNotFound();
    await this.checkpointRepository.remove(checkpoint);
  }
}
