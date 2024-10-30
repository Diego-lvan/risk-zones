import { Checkpoint } from 'src/checkpoint/entities/checkpoint.entity';
import { LightedStreet } from 'src/lighted-streets/entities/lighted_street.entity';
import { News } from 'src/news/entities/news.entity';
import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => News, (news) => news.user)
  newsList: News[];

  @OneToMany(() => Checkpoint, (checkpoint) => checkpoint.user)
  checkpoints: Checkpoint[];

  @OneToMany(() => LightedStreet, (LightedStreet) => LightedStreet.user)
  lightedStreets: LightedStreet[];
}
