import { UserEntity } from "@/src/user/domain/entities/user_entity";
export type ReactionType = "like" | "dislike" | null;
export interface ReactionEntity {
  newsId: number;
  likes: number;
  dislikes: number;
  userId: string;
  reactionType: ReactionType;
}
