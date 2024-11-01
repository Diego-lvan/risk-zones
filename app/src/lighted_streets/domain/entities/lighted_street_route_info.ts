import { CoordEntity } from "@/src/risk_zones_map/domain/entities/coordinate_entity";

export interface LightedStreetRouteInfo {
  distance: number;
  points: CoordEntity[];
}