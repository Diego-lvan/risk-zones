import { CoordEntity } from "@/src/risk_zones_map/domain/entities/coordinate_entity";

/**
 * Interface representing a model for a lighted street.
 */
export interface LightedStreetModel {
  /**
   * Unique identifier for the lighted street.
   */
  id: string;

  /**
   * Coordinates where the lighted street starts.
   */
  startCoords: CoordEntity;

  /**
   * Coordinates where the lighted street ends.
   */
  endCoords: CoordEntity;

  /**
   * User who reported or created the lighted street entry.
   */
  user: string;

  /**
   * Date when the lighted street entry was created.
   */
  createdAt: Date;

  /**
   * Rating of the lighted street.
   */
  rating: number;
}
