import { Module } from '@nestjs/common';
import { LightedStreetsController } from './lighted-streets.controller';
import { LightedStreetsService } from './lighted-streets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LightedStreet } from './entities/lighted_street.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [LightedStreetsController],
  providers: [LightedStreetsService],
  imports: [TypeOrmModule.forFeature([LightedStreet, User])],
})
export class LightedStreetModule {}
