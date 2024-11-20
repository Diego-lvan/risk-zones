export interface ReactionModel {
  newsId: number;
  userId: string;
  reactionType: "like" | "dislike";
  likes: number;
  dislikes: number;
}
