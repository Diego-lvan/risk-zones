import axios, { AxiosError } from "axios";
import { NewsDataSource } from "@/src/news/domain/datasources/news_datasource";
import { API_URL } from "@/common/constants/api";
import { NewsModel } from "../models/news_models";
import { ApiError } from "@/src/common/errors/api_error";
import { NewsEntity } from "@/src/news/domain/entities/news_entity";

export class NewsDataSourceImpl implements NewsDataSource {
  async saveNews(news: NewsEntity): Promise<void> {
    const newsModel: NewsModel = {
      title: news.title,
      description: news.description,
      latitude: news.coords.latitude,
      longitude: news.coords.longitude,
      userId: news.userId,
    };

    console.log("saveNews");
    try {
      const { status } = await axios.post(`${API_URL}/news`, newsModel);
      if (status !== 201) {
        throw new Error();
      }
    } catch (error) {
      const apiError = error as AxiosError;
      const message = apiError.response
        ? (apiError.response.data as { message: string }).message
        : "Error desconocido";
      throw new ApiError(message, apiError.response?.status || 500);
    }
  }
}
