import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { UserModule } from 'src/user/user.module';
import { Reactions } from './entities/reactions.entity';
@Module({
  imports: [TypeOrmModule.forFeature([News, User, Reactions]), UserModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
