import { News } from 'src/risk-zones/entities/news.entity';
import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => News, (news) => news.user)
  newsList: News[];
}
