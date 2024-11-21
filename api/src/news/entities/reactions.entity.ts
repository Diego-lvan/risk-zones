import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { News } from './news.entity';

@Entity('reaction')
export class Reactions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['like', 'dislike', null], nullable: false })
  reactionType: string;

  @ManyToOne(() => User, (user) => user.reactionsList, { nullable: true })
  user: User;

  @ManyToOne(() => News, (news) => news.reactionsList, { nullable: true })
  news: News;
}
