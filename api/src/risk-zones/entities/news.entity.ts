import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, Point, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false, length: 1024 })
  content: string;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column('geometry', { nullable: false })
  coords: Point;

  @ManyToOne(() => User, (user) => user.newsList, { nullable: true })
  user: User;
}