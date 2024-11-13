import { LightedStreet } from "../entities/lighted_street";
import { LightedStreetRatingForm } from "../entities/lighted_street_rating_form";

/**
 * Interface representing a repository for managing lighted streets.
 */
export interface LightedStreetsRepository {
  /**
   * Retrieves a list of lighted streets within a specified radius from a given location.
   * 
   * @param latitude - The latitude of the location to search from.
   * @param longitude - The longitude of the location to search from.
   * @param radius - The radius (in meters) within which to search for lighted streets.
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
   * @param form - The form containing the rating details for the lighted street.
   * @returns A promise that resolves when the rating has been successfully submitted.
   */
  rateLightedStreet(form: LightedStreetRatingForm): Promise<void>;
}
