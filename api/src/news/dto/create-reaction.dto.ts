import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReactionDto {
  @ApiProperty({ description: 'ID de noticia' })
  @IsNumber()
  @IsNotEmpty()
  newsId: number;

  @ApiProperty({ description: 'User id del que dara una reaccion' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Tipo de reacción' })
  @IsEnum(['like', 'dislike', null])
  reactionType: 'like' | 'dislike' | null;
}
