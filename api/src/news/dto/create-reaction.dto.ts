import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class ReactionDto {
  @IsNumber()
  @IsNotEmpty()
  newsId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsEnum(['like', 'dislike'])
  @IsNotEmpty()
  reactionType: 'like' | 'dislike';
}
