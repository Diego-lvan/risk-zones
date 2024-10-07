import { CoordEntity } from "@/src/risk_zones_map/domain/entities/coordinate_entity";

export interface News {
  id: number;
  title: string;
  description: string;
  date: Date;
  coords: CoordEntity;
}
