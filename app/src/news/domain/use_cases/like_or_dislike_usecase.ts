import { NewsDataSourceImpl } from "../../infrastructure/datasources/news_datasource";
import { NewsRepositoryImpl } from "../../infrastructure/repositories/news_repository";
import { ReactionEntity } from "../entities/reaction_entity";
import { NewsRepository } from "../repositories/news_repository";

interface LikeOrDislikeParams {
  newsId: number;
  userId: string;
  reactionType: "like" | "dislike";
}
/**
 * Use case to react to a news (like or dislike)
 * @class LikeOrDislikeUseCase
 */
export class LikeOrDislikeUseCase {
  private newsRepository: NewsRepository;

  constructor() {
    const datasource = new NewsDataSourceImpl();
    this.newsRepository = new NewsRepositoryImpl(datasource);
  }

  /**
   * Method to execute the use case
   * @param newId The id of the news
   * @param reactionType The type of reaction ('like' or 'dislike')
   * @returns The updated reaction count
   */
  async execute(params: LikeOrDislikeParams): Promise<ReactionEntity> {
    return this.newsRepository.updateLikeDislike(params);
  }
}
