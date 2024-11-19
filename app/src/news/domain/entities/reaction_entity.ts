export interface ReactionEntity {
  newsId: number;
  likes: number;
  dislikes: number;
  userId: string;
  recationType: "like" | "dislike";
}
