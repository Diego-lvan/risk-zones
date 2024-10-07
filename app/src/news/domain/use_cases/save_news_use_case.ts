import { NewsEntity } from "../entities/news_entity";
import { NewsForm } from "../../hooks/useValidateNewsForm";
import { NewsRepository } from "../repositories/news_repository";
import { NewsDataSourceImpl } from "../../infrastructure/datasources/news_datasource";
import { NewsRepositoryImpl } from "../../infrastructure/repositories/news_repository";
import { ApiError } from "@/src/common/errors/api_error";

export class SaveNewsUseCase {
  private newsRepository: NewsRepository;

  constructor() {
    const datasource = new NewsDataSourceImpl();
    this.newsRepository = new NewsRepositoryImpl(datasource);
  }

  public async execute(news: NewsForm) {
    try {
      const newsEntity = this.validate(news);
      await this.newsRepository.saveNews(newsEntity);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Error saving news", 500);
    }
  }

  private validate(news: NewsForm): NewsEntity {
    if (!news.title || news.title.split(" ").length > 6) {
      throw new Error("Invalid title");
    }
    if (!news.description || news.description.split(" ").length > 50) {
      throw new Error("Invalid description");
    }
    const publishedAt = new Date(news.date);
    if (isNaN(publishedAt.getTime())) {
      throw new Error("Invalid published date");
    }
    if (!news.latitude || !news.longitude) {
      throw new Error("Invalid coordinates");
    }

    return {
      title: news.title,
      description: news.description,
      date: publishedAt,
      coords: {
        latitude: news.latitude,
        longitude: news.longitude,
      },
      userId: news.userId,
    };
  }
}
