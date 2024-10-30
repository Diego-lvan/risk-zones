import { NewsEntity } from "../entities/news_entity";
import { NewInfoEntity } from "../entities/see_new_entity";

export interface NewsRepository {
  saveNews(news: NewsEntity): Promise<void>;
  getNewInfo(newId: number): Promise<NewInfoEntity>;
}
