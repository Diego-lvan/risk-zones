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
      content: news.description,
      point: {
        latitude: news.coords.latitude,
        longitude: news.coords.longitude,
      },
      user: news.userId,
      date: new Date().toISOString(),
    };

    console.log("Datos que se envían al backend:", newsModel);
    try {
      const { status } = await axios.post(`${API_URL}/news`, newsModel);
      console.log(status);
      console.log("Datos que se envían al backend:", newsModel);
      if (status !== 201) {
        throw new Error();
      }
    } catch (error) {
      const apiError = error as AxiosError;
      const message = apiError.response
        ? (apiError.response.data as { message: string }).message
        : "Error desconocido";
      console.log("Error al guardar la noticia:", apiError.response?.data);

      throw new ApiError(message, apiError.response?.status || 500);
    }
  }
}
