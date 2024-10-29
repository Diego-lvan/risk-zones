import { CoordEntity } from "@/src/risk_zones_map/domain/entities/coordinate_entity";
import { LightedStreetPoints } from "../entities/lighted_street_points";

export interface StreetPointsRepository {
  getStreetPoints(
    start: CoordEntity,
    end: CoordEntity
  ): Promise<LightedStreetPoints>;
}
