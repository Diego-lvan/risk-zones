import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConstants } from './constants/db.constants';
import { User } from './user/entities/user.entity';
import { News } from './risk-zones/entities/news.entity';
import { RiskAreasModule } from './risk-zones/risk-areas.module';
import { CheckpointModule } from './checkpoint/checkpoint.module';
import { Checkpoint } from './checkpoint/entities/checkpoint.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DbConstants.DB_HOST,
      port: DbConstants.DB_PORT,
      username: DbConstants.DB_USER,
      password: DbConstants.DB_PASSWORD,
      database: DbConstants.DB_NAME,
      entities: [
        User,
        News,
        Checkpoint
      ],
      synchronize: true,
      logging: false,
    }),
    RiskAreasModule,
    CheckpointModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [TypeOrmModule]
})
export class AppModule {}
