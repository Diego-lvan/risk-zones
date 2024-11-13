import { LightedStreet } from "../entities/lighted_street";
import { LightedStreetRatingForm } from "../entities/lighted_street_rating_form";

/**
 * Interface representing a data source for lighted streets.
 */
export interface LightedStreetsDatasource {
  /**
   * Retrieves a list of lighted streets within a specified radius of a given location.
   * 
   * @param latitude - The latitude of the location to search around.
   * @param longitude - The longitude of the location to search around.
   * @param radius - The radius (in meters) to search within.
   * @returns A promise that resolves to an array of LightedStreet objects.
   */
  getLightedStreets(
    latitude: number,
    longitude: number,
    radius: number
  ): Promise<LightedStreet[]>;

  /**
   * Submits a rating for a lighted street.
   * 
   * @param form - The form containing the rating details.
   * @returns A promise that resolves when the rating has been successfully submitted.
   */
  rateLightedStreet(form: LightedStreetRatingForm): Promise<void>;
}
