import { User } from 'src/user/entities/user.entity';
import { Column, ManyToOne, Point, PrimaryGeneratedColumn } from 'typeorm';

export class LightingReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('geometry', { nullable: false })
  startCoords: Point;

  @Column('geometry', { nullable: false })
  endCoords: Point;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.lightingReportList, { nullable: true })
  user: User;
  lightingReport: Promise<User>;
}
