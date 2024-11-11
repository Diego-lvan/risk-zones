import { Coordinate } from 'src/common/interfaces/coordinate';

/**
 * Data Transfer Object for LightedStreet
 */
export class LightedStreetDTO {
  /**
   * Unique identifier for the lighted street
   */
  id: string;

  /**
   * Coordinates where the lighted street starts
   */
  startCoords: Coordinate;

  /**
   * Coordinates where the lighted street ends
   */
  endCoords: Coordinate;

  /**
   * Optional user who created the lighted street entry
   */
  user?: string;

  /**
   * Date when the lighted street entry was created
   */
  createdAt: Date;

  /**
   * Rating of the lighted street
   */
  rating: number;
}
