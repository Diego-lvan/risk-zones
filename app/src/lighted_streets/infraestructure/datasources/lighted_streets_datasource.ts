import axios, { AxiosError } from "axios";
import { LightedStreetsDatasource } from "../../domain/datasources/lighted_streets_datasource";
import { LightedStreet } from "../../domain/entities/lighted_street";
import { LightedStreetModel } from "../models/lighted_street_model";
import { API_URL } from "@/common/constants/api";
import { LightedStreetRatingForm } from "../../domain/entities/lighted_street_rating_form";
import { ApiError } from "@/src/common/errors/api_error";

/**
 * Implementation of the LightedStreetsDatasource interface.
 * This class is responsible for fetching and rating lighted streets from the API.
 */
export class LightedStreetsDatasourceImpl implements LightedStreetsDatasource {
  /**
   * Fetches lighted streets within a specified radius from given coordinates.
   * @param latitude - The latitude of the center point.
   * @param longitude - The longitude of the center point.
   * @param radius - The radius within which to search for lighted streets.
   * @returns A promise that resolves to an array of LightedStreet objects.
   * @throws An error if the request fails or the status code is not 200.
   */
  async getLightedStreets(
    latitude: number,
    longitude: number,
    radius: number
  ): Promise<LightedStreet[]> {
    const { data, status } = await axios.get<LightedStreetModel[]>(
      API_URL + "/lighted-streets",
      {
        params: {
          latitude: latitude,
          longitude: longitude,
          radius: radius,
        },
        timeout: 6000,
      }
    );

    if (status != 200) {
      throw new Error("Error fetching lighted streets");
    }

    const streets: LightedStreet[] = data.map((street) => {
      return {
        id: street.id,
        startCoords: street.startCoords,
        endCoords: street.endCoords,
        rating: street.rating,
      };
    });

    return streets;
  }

  /**
   * Rates a lighted street based on the provided form data.
   * @param form - The form data containing the rating information.
   * @returns A promise that resolves to void.
   * @throws An error if the request fails or the status code is not 201.
   */
  async rateLightedStreet(form: LightedStreetRatingForm): Promise<void> {
    await axios.post(API_URL + "/lighted-streets/rate", form, {
      timeout: 6000,
    });
  }
}
