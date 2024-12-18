import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConstants } from './constants/db.constants';
import { User } from './user/entities/user.entity';
import { News } from 'src/news/entities/news.entity';
import { RiskAreasModule } from './risk-zones/risk-areas.module';
import { NotificationModule } from './notification/notification.module';
import { CheckpointModule } from './checkpoint/checkpoint.module';
import { Checkpoint } from './checkpoint/entities/checkpoint.entity';
import { UserModule } from './user/user.module';
import { NewsModule } from './news/news.module';
import { LightedStreet } from './lighted-streets/entities/lighted_street.entity';
import { LightedStreetModule } from './lighted-streets/lighted-streets.module';
import { LightingRating } from './lighted-streets/entities/lighting_rating.entity';
import { Reactions } from './news/entities/reactions.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DbConstants.DB_HOST,
      port: DbConstants.DB_PORT,
      username: DbConstants.DB_USER,
      password: DbConstants.DB_PASSWORD,
      database: DbConstants.DB_NAME,
      entities: [User, News, Checkpoint, LightedStreet, LightingRating, Reactions],
      synchronize: true,
      logging: false,
    }),
    RiskAreasModule,
    NotificationModule,
    CheckpointModule,
    UserModule,
    NewsModule,
    LightedStreetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [TypeOrmModule],
})
export class AppModule {}
