import { CoordEntity } from "@/src/risk_zones_map/domain/entities/coordinate_entity";

export interface LightedStreetModel {
  id: string;
  startCoords: CoordEntity;
  endCoords: CoordEntity;
  user: string;
  createdAt: Date;
}
