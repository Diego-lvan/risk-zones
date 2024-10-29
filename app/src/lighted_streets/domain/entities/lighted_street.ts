import { CoordEntity } from "@/src/risk_zones_map/domain/entities/coordinate_entity";

export interface LightedStreet {
  id: string;
  startCoords: CoordEntity;
  endCoords: CoordEntity;
}