import { NewsEntity } from "../entities/news_entity";

export interface NewsRepository {
  saveNews(news: NewsEntity): Promise<void>;
}
