import { RiskAreasDatasource } from "../../domain/datasources/risk_areas_datasource";
import { RiskPoint } from "../../domain/entities/risk_point_entity";
import { RiskAreasRepository } from "../../domain/repositories/risk_areas_repository";

export class RiskAreasRepositoryImpl implements RiskAreasRepository {
  constructor(private datasouce: RiskAreasDatasource) {}

  getRiskPoints(
    latitude: number,
    longitude: number,
    radius: number
  ): Promise<RiskPoint[]> {
    return this.datasouce.getRiskPoints(latitude, longitude, radius);
  }
}
