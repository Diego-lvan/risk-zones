import { Injectable } from '@nestjs/common';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';
import { UserService } from 'src/user/user.service';
import { Point, Repository } from 'typeorm';
import { Checkpoint } from './entities/checkpoint.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MINIMUM_DISTANCE_BETWEEN_CHECKPOINTS } from './constants/checkpoint.constants';

@Injectable()
export class CheckpointService {
  constructor(
    private readonly userService: UserService, 
    @InjectRepository(Checkpoint)
    private readonly checkpointRepository: Repository<Checkpoint>
  ) {}
  async create(createCheckpointDto: CreateCheckpointDto) {
    const user = await this.userService.findOne(createCheckpointDto.userId);
    const coordinates: Point = {
      type: 'Point',
      coordinates: [createCheckpointDto.longitude, createCheckpointDto.latitude]
    };

    const checkpoint = this.checkpointRepository.create({
      name: createCheckpointDto.name,
      coords: coordinates,
      user
    });

    if (!await this.isAbleToMakeAPoint(checkpoint)) {
      throw new Error('You are too close to another checkpoint');
    }

    return this.checkpointRepository.save(checkpoint);
  }

  private async isAbleToMakeAPoint(checkpoint: Checkpoint) {
    const points = await this.checkpointRepository
    .createQueryBuilder('checkpoint')
    .where('ST_DWithin(ST_Transform(checkpoint.coords, 3857), ST_Transform(ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326), 3857), :distance)')
    .setParameters({
      longitude: checkpoint.coords.coordinates[0],
      latitude: checkpoint.coords.coordinates[1],
      distance: MINIMUM_DISTANCE_BETWEEN_CHECKPOINTS
    })
    .getMany();
    console.log(points);
    if (points.length > 0) {
      return false;
    }
    return true;
  }

  async findAllByUser(id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    return this.checkpointRepository.find({where: {user}});
  }

  findOne(id: number) {
    return `This action returns a #${id} checkpoint`;
  }

  update(id: number, updateCheckpointDto: UpdateCheckpointDto) {
    return `This action updates a #${id} checkpoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkpoint`;
  }
}
