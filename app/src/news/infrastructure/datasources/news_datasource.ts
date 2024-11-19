import axios, { AxiosError } from "axios";
import { NewsDataSource } from "@/src/news/domain/datasources/news_datasource";
import { API_URL } from "@/common/constants/api";
import { NewsModel } from "../models/news_models";
import { ApiError } from "@/src/common/errors/api_error";
import { NewsEntity } from "@/src/news/domain/entities/news_entity";
import { NewInfoEntity } from "../../domain/entities/see_new_entity";
import { NewInfoModel } from "../models/new_info_model";
import { ReactionEntity } from "../../domain/entities/reaction_entity";

/**
 * Clase que implementa la fuente de datos de noticias
 */
export class NewsDataSourceImpl implements NewsDataSource {
  /**
   * Metodo que obtiene la información de una noticia
   * @param newId Identificador de la noticia
   * @returns Una promesa con la información de la noticia
   */
  async getNewInfo(newId: number): Promise<NewInfoEntity> {
    try {
      const { data, status } = await axios.get<NewInfoModel>(
        `${API_URL}/news/${newId}`
      );
      console.log("Datos que se reciben del backend:", data);
      if (status !== 200) {
        throw new Error();
      }
      const news: NewInfoEntity = {
        id: data.id,
        title: data.title,
        description: data.content,
        createdAt: new Date(data.createdAt),
      };
      console.log("Datos que se reciben del backend:", news);
      return news;
    } catch (error) {
      const apiError = error as AxiosError;
      const message = apiError.response
        ? (apiError.response.data as { message: string }).message
        : "Error desconocido";
      console.log("Error al obtener la noticia:", apiError.response?.status);
      throw new ApiError(message, apiError.response?.status || 500);
    }
  }
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
  async updateLikeDislike(reaction: ReactionEntity): Promise<ReactionEntity> {
    try {
      const { data, status } = await axios.post<ReactionEntity>(
        `${API_URL}/news/${reaction.newsId}/reactions`,
        {
          reactionType: reaction.recationType,
          userId: reaction.userId,
          likes: reaction.likes,
          dislikes: reaction.dislikes,
        }
      );
      if (status !== 200) {
        throw new Error();
      }
      return data;
    } catch (error) {
      const apiError = error as AxiosError;
      const message = apiError.response
        ? (apiError.response.data as { message: string }).message
        : "Error desconocido";
      console.log("Error al enviar la reacción:", apiError.response?.data);

      throw new ApiError(message, apiError.response?.status || 500);
    }
  }
}
