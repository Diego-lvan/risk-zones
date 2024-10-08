import { CoordEntity } from "@/src/risk_zones_map/domain/entities/coordinate_entity";

export interface NewsEntity {
  userId: string;
  title: string;
  description: string;
  date: Date;
  coords: CoordEntity;
}
