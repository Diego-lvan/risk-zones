import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, Point, PrimaryGeneratedColumn } from 'typeorm';

@Entity('lighted_street')
export class LightedStreet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('geometry', { nullable: false })
  startCoords: Point;

  @Column('geometry', { nullable: false })
  endCoords: Point;

  @ManyToOne(() => User, (user) => user.newsList, { nullable: true })
  user: User;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
