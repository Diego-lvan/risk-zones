import { NewsEntity } from "../entities/news_entity";

export interface NewsDataSource {
  saveNews(news: NewsEntity): Promise<void>;
}
