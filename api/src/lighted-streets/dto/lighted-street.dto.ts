import { Coordinate } from 'src/risk-zones/interfaces/coordinate';

export class LightedStreetDTO {
  id: string;
  startCoords: Coordinate;
  endCoords: Coordinate;
  user?: string;
  createdAt: Date;
}
