import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { LightedStreet } from './lighted_street.entity';
import { User } from 'src/user/entities/user.entity';

/**
 * Entity representing a rating given by a user to a lighted street.
 */
@Entity()
export class LightingRating {
  /**
   * The ID of the user who gave the rating.
   * This is a primary key.
   */
  @PrimaryColumn('uuid')
  userId: string;

  /**
   * The ID of the street that was rated.
   * This is a primary key.
   */
  @PrimaryColumn('uuid')
  streetId: string;

  /**
   * The user who gave the rating.
   * This is a many-to-one relationship with the User entity.
   */
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  /**
   * The street that was rated.
   * This is a many-to-one relationship with the LightedStreet entity.
   */
  @ManyToOne(() => LightedStreet, (lightedStreet) => lightedStreet.id)
  @JoinColumn({ name: 'streetId' })
  street: LightedStreet;

  /**
   * The rating given to the street.
   * This is a decimal value with precision 2 and scale 1.
   * The default value is 2.5.
   */
  @Column('decimal', { precision: 2, scale: 1, nullable: false, default: 2.5 })
  rating: number;
}
