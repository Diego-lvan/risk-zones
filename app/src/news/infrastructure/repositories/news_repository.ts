import { NewsApi } from "../datasources/news_api";

export class NewsRepository {
  static async createNews(newsData: any) {
    return await NewsApi.createNews(newsData);
  }
}
