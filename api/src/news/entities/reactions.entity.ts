import { User } from 'src/user/entities/user.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { News } from './news.entity';

export class Reactions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  reactionType: string;

  @ManyToOne(() => User, (user) => user.reactionsList, { nullable: true })
  user: User;

  @ManyToOne(() => News, (news) => news.reactionsList, { nullable: true })
  news: News;
}
