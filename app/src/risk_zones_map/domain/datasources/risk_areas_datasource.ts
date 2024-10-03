import { RiskPoint } from "../entities/risk_point_entity";

export interface RiskAreasDatasource {
    getRiskPoints(latitude: number, longitude: number, radius: number): Promise<RiskPoint[]>;
}