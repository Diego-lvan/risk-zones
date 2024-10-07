import { NewsRepository } from "../../infrastructure/repositories/news_repository";

export const CreateNewsUseCase = async (newsData: any) => {
  return await NewsRepository.createNews(newsData);
};
