import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, Point, PrimaryGeneratedColumn } from 'typeorm';
import { LightingRating } from './lighting_rating.entity';

@Entity('lighted_street')
export class LightedStreet {
  /**
   * Unique identifier for the lighted street.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Starting coordinates of the lighted street.
   * Stored as a geometry point.
   */
  @Column('geometry', { nullable: false })
  startCoords: Point;

  /**
   * Ending coordinates of the lighted street.
   * Stored as a geometry point.
   */
  @Column('geometry', { nullable: false })
  endCoords: Point;

  /**
   * User who reported or is responsible for the lighted street.
   * Nullable field.
   */
  @ManyToOne(() => User, (user) => user.newsList, { nullable: true })
  user: User;

  /**
   * Timestamp when the lighted street record was created.
   * Defaults to the current timestamp.
   */
  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  /**
   * List of lighting ratings associated with the lighted street.
   */
  @OneToMany(() => LightingRating, (LightingRating) => LightingRating.street)
  lightingRatings: LightingRating[];
}
