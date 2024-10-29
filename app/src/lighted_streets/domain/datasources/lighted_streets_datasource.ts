import { LightedStreet } from "../entities/lighted_street";

export interface LightedStreetsDatasource {
  getLightedStreets(
    latitude: number,
    longitude: number,
    radius: number
  ): Promise<LightedStreet[]>;
}
