import { Injectable } from '@nestjs/common';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Checkpoint } from './entities/checkpoint.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CheckpointService {
  constructor(
    private readonly userService: UserService, 
    @InjectRepository(Checkpoint)
    private readonly checkpointRepository: Repository<Checkpoint>
  ) {}
  async create(createCheckpointDto: CreateCheckpointDto) {


  }

  findAll() {
    return `This action returns all checkpoint`;
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
