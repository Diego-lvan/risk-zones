import { LightedStreetsDatasource } from "../../domain/datasources/lighted_streets_datasource";
import { LightedStreet } from "../../domain/entities/lighted_street";
import { LightedStreetRatingForm } from "../../domain/entities/lighted_street_rating_form";
import { LightedStreetsRepository } from "../../domain/repositories/lighted_streets_repository";

/**
 * Implementation of the LightedStreetsRepository interface.
 * This class is responsible for interacting with the data source to fetch and rate lighted streets.
 */
export class LightedStreetsRepositoryImpl implements LightedStreetsRepository {
  /**
   * Constructor for LightedStreetsRepositoryImpl.
   * @param lightedStreetsDatasource - The data source to interact with for lighted streets data.
   */
  constructor(private lightedStreetsDatasource: LightedStreetsDatasource) {}

  /**
   * Fetches lighted streets within a specified radius from a given latitude and longitude.
   * @param latitude - The latitude to search from.
   * @param longitude - The longitude to search from.
   * @param radius - The radius within which to search for lighted streets.
   * @returns A promise that resolves to an array of LightedStreet objects.
   */
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

  /**
   * Submits a rating for a lighted street.
   * @param form - The form containing the rating details.
   * @returns A promise that resolves when the rating has been submitted.
   */
  async rateLightedStreet(form: LightedStreetRatingForm): Promise<void> {
    return this.lightedStreetsDatasource.rateLightedStreet(form);
  }
}
