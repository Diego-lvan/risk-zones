import { NewsDataSource } from "../../domain/datasources/news_datasource";
import { NewsEntity } from "../../domain/entities/news_entity";
import { NewsRepository } from "../../domain/repositories/news_repository";

export class NewsRepositoryImpl implements NewsRepository {
  private readonly dataSource: NewsDataSource;

  constructor(dataSource: NewsDataSource) {
    this.dataSource = dataSource;
  }
  async saveNews(news: NewsEntity): Promise<void> {
    return await this.dataSource.saveNews(news);
  }
}
