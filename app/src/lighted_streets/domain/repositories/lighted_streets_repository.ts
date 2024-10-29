import { LightedStreet } from "../entities/lighted_street";

export interface LightedStreetsRepository {
  getLightedStreets(
    latitude: number,
    longitude: number,
    radius: number
  ): Promise<LightedStreet[]>;
}
