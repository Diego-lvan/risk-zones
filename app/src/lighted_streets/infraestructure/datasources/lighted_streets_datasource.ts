import axios from "axios";
import { LightedStreetsDatasource } from "../../domain/datasources/lighted_streets_datasource";
import { LightedStreet } from "../../domain/entities/lighted_street";
import { LightedStreetModel } from "../models/lighted_street_model";
import { API_URL } from "@/common/constants/api";

export class LightedStreetsDatasourceImpl implements LightedStreetsDatasource {
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
      };
    });

    return streets;
  }
}
