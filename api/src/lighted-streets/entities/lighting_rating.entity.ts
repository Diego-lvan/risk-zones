import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { LightedStreet } from './lighted_street.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class LightingRating {
  @PrimaryColumn('uuid')
  userId: string;

  @PrimaryColumn('uuid')
  streetId: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => LightedStreet, (lightedStreet) => lightedStreet.id)
  @JoinColumn({ name: 'streetId' })
  street: LightedStreet;

  @Column('decimal', { precision: 2, scale: 1, nullable: false, default: 2.5 })
  rating: number;
}
