import { CoordEntity } from "@/src/risk_zones_map/domain/entities/coordinate_entity";

/**
 * Interface representing a lighted street.
 */
export interface LightedStreet {
  /**
   * Unique identifier for the lighted street.
   */
  id: string;

  /**
   * Coordinates representing the start of the street.
   */
  startCoords: CoordEntity;

  /**
   * Coordinates representing the end of the street.
   */
  endCoords: CoordEntity;

  /**
   * Rating of the street based on lighting conditions.
   */
  rating: number;
}