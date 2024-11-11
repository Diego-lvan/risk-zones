import { Module } from '@nestjs/common';
import { LightedStreetsController } from './lighted-streets.controller';
import { LightedStreetsService } from './lighted-streets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LightedStreet } from './entities/lighted_street.entity';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { LightingRating } from './entities/lighting_rating.entity';

@Module({
  controllers: [LightedStreetsController],
  providers: [LightedStreetsService],
  imports: [TypeOrmModule.forFeature([LightedStreet, User, LightingRating]), UserModule],
})
export class LightedStreetModule {}
