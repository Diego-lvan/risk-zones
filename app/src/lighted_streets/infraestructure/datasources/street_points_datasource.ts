import { CoordEntity } from "@/src/risk_zones_map/domain/entities/coordinate_entity";
import { StreetPointsDatasource } from "../../domain/datasources/street_points_datasource";
import { LightedStreetPoints } from "../../domain/entities/lighted_street_points";
import axios from "axios";

export class StreetPointsDatasourceImpl implements StreetPointsDatasource {
  async getStreetPoints(
    start: CoordEntity,
    end: CoordEntity
  ): Promise<LightedStreetPoints> {
    const { data } = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?geometries=geojson&access_token=${process.env.EXPO_PUBLIC_MAPBOX_API_KEY}`
    );
    const routeCoordinates: CoordEntity[] =
      data.routes[0].geometry.coordinates.map((coord: [number, number]) => ({
        latitude: coord[1],
        longitude: coord[0],
      }));
    return { points: routeCoordinates };
  }
}