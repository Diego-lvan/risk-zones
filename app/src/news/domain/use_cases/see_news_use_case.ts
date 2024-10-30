import { NewsDataSourceImpl } from "../../infrastructure/datasources/news_datasource";
import { NewsRepositoryImpl } from "../../infrastructure/repositories/news_repository";
import { NewsRepository } from "../repositories/news_repository";

/**
 * Use case to see a news
 * @class SeeNewsUseCase
 */
export class SeeNewsUseCase {
  private newsRepository: NewsRepository;
  constructor() {
    const datasource = new NewsDataSourceImpl();
    this.newsRepository = new NewsRepositoryImpl(datasource);
  }
  /**
   * Method to execute the use case
   * @param newId The id of the news
   * @returns The news information
   */
  async execute(newId: number) {
    return this.newsRepository.getNewInfo(newId);
  }
}
