import { CoordEntity } from "@/src/risk_zones_map/domain/entities/coordinate_entity";

export interface LightingReportEntity {
  userId: string;
  startCoords: CoordEntity;
  endCoords: CoordEntity;
  created_at: Date;
}
