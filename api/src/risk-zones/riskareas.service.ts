import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from 'src/news/entities/news.entity';
import { RiskPoint } from './dto/risk-point.dto';
import { Repository } from 'typeorm';

@Injectable()
export class RiskAreasService {
  constructor(@InjectRepository(News) private newsRepository: Repository<News>) {}

  async findPoints(long: number, lat: number, radius: number): Promise<RiskPoint[]> {
    const newsList = await this.newsRepository
      .createQueryBuilder('news')
      .where(`ST_DWithin(coords,ST_MakePoint(:long, :lat)::geography,:radius)`, { long, lat, radius })
      .getMany();

    const riskPoints: RiskPoint[] = newsList.map((news): RiskPoint => {
      return {
        id: news.id,
        title: news.title,
        coords: {
          longitude: news.coords.coordinates[0],
          latitude: news.coords.coordinates[1],
        },
      };
    });

    return riskPoints;
  }
}
