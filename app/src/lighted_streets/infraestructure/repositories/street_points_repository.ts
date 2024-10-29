import { CoordEntity } from "@/src/risk_zones_map/domain/entities/coordinate_entity";
import { LightedStreetPoints } from "../../domain/entities/lighted_street_points";
import { StreetPointsRepository } from "../../domain/repositories/street_points_repository";
import { StreetPointsDatasource } from "../../domain/datasources/street_points_datasource";

export class StreetPointsRepositoryImpl implements StreetPointsRepository {
  constructor(private streetPointsDatasource: StreetPointsDatasource) {}

  async getStreetPoints(
    start: CoordEntity,
    end: CoordEntity
  ): Promise<LightedStreetPoints> {
    return this.streetPointsDatasource.getStreetPoints(start, end);
  }
}
