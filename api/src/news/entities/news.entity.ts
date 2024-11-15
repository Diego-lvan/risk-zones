import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, Point, PrimaryGeneratedColumn } from 'typeorm';
import { Reactions } from './reactions.entity';
@Entity('news')
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false, length: 1024 })
  content: string;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @ManyToOne(() => User, (user) => user.newsList, { nullable: true })
  user: User;

  @Column('geometry', { nullable: false })
  coords: Point;

  @OneToMany(() => Reactions, (reactions) => reactions.news)
  reactionsList: Reactions[];
}
