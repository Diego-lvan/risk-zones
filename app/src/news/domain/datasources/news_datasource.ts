import { NewsEntity } from "../entities/news_entity";
import { ReactionEntity } from "../entities/reaction_entity";
import { NewInfoEntity } from "../entities/see_new_entity";

export interface NewsDataSource {
  saveNews(news: NewsEntity): Promise<void>;
  getNewInfo(newId: number): Promise<NewInfoEntity>;
  updateLikeDislike(params: {
    newsId: number;
    userId: string;
    reactionType: "like" | "dislike" | null;
  }): Promise<ReactionEntity>;
}
