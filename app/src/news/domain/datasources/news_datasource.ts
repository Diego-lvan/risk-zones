import { News } from "@/src/news/domain/entities/news_entity";

export interface NewsDatasource {
  getNews(): Promise<News[]>;
  getNewsById(id: string): Promise<News>;
  saveNews(news: News): Promise<void>;
  deleteNews(id: string): Promise<void>;
  updateNews(news: News): Promise<void>;
}
