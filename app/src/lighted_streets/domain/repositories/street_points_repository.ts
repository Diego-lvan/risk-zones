import { CoordEntity } from "@/src/risk_zones_map/domain/entities/coordinate_entity";
import { LightedStreetRouteInfo } from "../entities/lighted_street_route_info";

export interface StreetPointsRepository {
  getStreetPoints(
    start: CoordEntity,
    end: CoordEntity
  ): Promise<LightedStreetRouteInfo>;
}
