import { NewsForm } from "../../hooks/useNews";
import { News } from "../entities/news_entity";

export class SaveNewsUseCase {
  //private newsRepository: NewsRepository;
  constructor() {
    //this.newsRepository = new NewsRepository();
  }

  public async execute(news: NewsForm) {
    try {
      const newsEntity = this.validate(news);
      //await this.newsRepository.saveNews(newsEntity);
    } catch (error) {
      console.log(error);
      throw new Error("Error saving news");
    }
  }

  private validate(news: NewsForm): News {
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

    return {
      id: 0,
      title: news.title,
      description: news.description,
      date: publishedAt,
      coords: {
        latitude: news.latitude,
        longitude: news.longitude,
      },
    };
  }
}
