import { NewsEntity } from "../entities/news_entity";
import { NewsForm } from "../../hooks/useSaveNews";

export class SaveNewsUseCase {
  //private newsRepository: NewsRepository;

  constructor() {
    //this.newsRepository = newsRepository;
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
    };
  }
}
