import { RiskPoint } from "../entities/risk_point_entity";

export interface RiskAreasRepository {
  getRiskPoints(
    latitude: number,
    longitude: number,
    radius: number
  ): Promise<RiskPoint[]>;
}
