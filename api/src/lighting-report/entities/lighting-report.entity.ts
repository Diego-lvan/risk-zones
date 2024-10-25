import { User } from 'src/user/entities/user.entity';
import { Column, ManyToOne, Point, PrimaryGeneratedColumn } from 'typeorm';

export class LightingReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('geometry', { nullable: false })
  startPoint: Point;

  @Column('geometry', { nullable: false })
  endPoint: Point;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @ManyToOne(() => User, (user) => user.lightingReportList, { nullable: true })
  user: User;
}
