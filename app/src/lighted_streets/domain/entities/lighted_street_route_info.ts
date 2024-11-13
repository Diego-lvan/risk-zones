import { CoordEntity } from "@/src/risk_zones_map/domain/entities/coordinate_entity";

/**
 * Interface representing information about a lighted street route.
 */
export interface LightedStreetRouteInfo {
  /**
   * The unique identifier for the street.
   * This is optional and may not be present for all routes.
   */
  streetId?: string;

  /**
   * The total distance of the route in meters.
   * This value is required and represents the length of the route.
   */
  distance: number;

  /**
   * The rating of the route, optional.
   * This could represent user ratings or some calculated safety score.
   * If present, it provides additional information about the perceived quality or safety of the route.
   */
  rating?: number;

  /**
   * An array of coordinates representing the points along the route.
   * Each coordinate is an instance of CoordEntity, which includes latitude and longitude.
   * This array is required and defines the path of the route.
   */
  points: CoordEntity[];
}
