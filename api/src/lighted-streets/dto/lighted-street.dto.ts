import { Coordinate } from 'src/common/interfaces/coordinate';

export class LightedStreetDTO {
  id: string;
  startCoords: Coordinate;
  endCoords: Coordinate;
  user?: string;
  createdAt: Date;
}
