import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, Point, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Checkpoint {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326 })
  coords: Point;
  @ManyToOne(() => User, (user) => user.checkpoints)
  user: User;
}
