import { Module } from '@nestjs/common';
import { RiskAreasController } from './risk-areas.controller';
import { RiskAreasService } from './riskareas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from 'src/news/entities/news.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [RiskAreasController],
  providers: [RiskAreasService],
  imports: [TypeOrmModule.forFeature([News, User])],
})
export class RiskAreasModule {}
