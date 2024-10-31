import { CoordEntity } from "@/src/risk_zones_map/domain/entities/coordinate_entity";
import { LightedStreetRouteInfo } from "../../domain/entities/lighted_street_route_info";
import { StreetPointsRepository } from "../../domain/repositories/street_points_repository";
import { StreetPointsDatasource } from "../../domain/datasources/street_points_datasource";

export class StreetPointsRepositoryImpl implements StreetPointsRepository {
  constructor(private streetPointsDatasource: StreetPointsDatasource) {}

  async getStreetPoints(
    start: CoordEntity,
    end: CoordEntity
  ): Promise<LightedStreetRouteInfo> {
    return this.streetPointsDatasource.getStreetPoints(start, end);
  }
}
