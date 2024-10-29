import { LightedStreetsDatasource } from "../../domain/datasources/lighted_streets_datasource";
import { LightedStreet } from "../../domain/entities/lighted_street";
import { LightedStreetsRepository } from "../../domain/repositories/lighted_streets_repository";

export class LightedStreetsRepositoryImpl implements LightedStreetsRepository {
  constructor(private lightedStreetsDatasource: LightedStreetsDatasource) {}

  async getLightedStreets(
    latitude: number,
    longitude: number,
    radius: number
  ): Promise<LightedStreet[]> {
    return this.lightedStreetsDatasource.getLightedStreets(
      latitude,
      longitude,
      radius
    );
  }
}
