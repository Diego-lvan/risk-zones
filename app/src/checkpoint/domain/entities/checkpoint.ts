import { CoordEntity } from "@/src/risk_zones_map/domain/entities/coordinate_entity";

export interface Checkpoint {
  id: number;
  name: string;
  coords: CoordEntity;
  userId: string;
}
