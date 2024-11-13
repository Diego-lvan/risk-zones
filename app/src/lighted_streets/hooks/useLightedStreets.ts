import { useEffect, useState } from "react";
import { LightedStreetsDatasourceImpl } from "../infraestructure/datasources/lighted_streets_datasource";
import { LightedStreetsRepositoryImpl } from "../infraestructure/repositories/lighted_streets_repository";
import * as Location from "expo-location";
import { LatLng } from "@/src/risk_zones_map/hooks/useRiskAreas";
import { Region } from "react-native-maps";
import { LightedStreet } from "../domain/entities/lighted_street";
import axios, { AxiosError } from "axios";
import { showErrorMessage } from "@/src/common/errors/error_message";
import { LightedStreetRouteInfo } from "../domain/entities/lighted_street_route_info";
import { StreetPointsRepositoryImpl } from "../infraestructure/repositories/street_points_repository";
import { StreetPointsDatasourceImpl } from "../infraestructure/datasources/street_points_datasource";
import { router } from "expo-router";
import { useLightedStreetsContext } from "../context/lightes_streets_context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const lightedStreetsRepository = new LightedStreetsRepositoryImpl(
  new LightedStreetsDatasourceImpl()
);

const streetPointsRepository = new StreetPointsRepositoryImpl(
  new StreetPointsDatasourceImpl()
);

/**
 * Custom hook to manage lighted streets data and user location.
 */
export const useLightedStreets = () => {
  const [location, setLocation] = useState<LatLng | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialRegion, setInitialRegion] = useState<Region | undefined>();
  const [radius, setRadius] = useState<number>(200);
  const { lightedStreetsPoints, setStreetsPoints, setRegion } =
    useLightedStreetsContext();

  /**
   * Calculate the distance between two geographical points using the Haversine formula.
   * @param startLatitude - Latitude of the starting point.
   * @param startLongitude - Longitude of the starting point.
   * @param endLatitude - Latitude of the ending point.
   * @param endLongitude - Longitude of the ending point.
   * @returns The distance in meters.
   */
  const getDistance = (
    startLatitude: number,
    startLongitude: number,
    endLatitude: number,
    endLongitude: number
  ): number => {
    const R = 6378.137;
    const dLat =
      (endLatitude * Math.PI) / 180 - (startLatitude * Math.PI) / 180;
    const dLon =
      (endLongitude * Math.PI) / 180 - (startLongitude * Math.PI) / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((startLatitude * Math.PI) / 180) *
        Math.cos((endLatitude * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000;
  };

  /**
   * Detects when the user moves the map and calculates the radius based on the screen.
   * @param region - The new region of the map.
   */
  const onChangeRadius = (region: Region) => {
    if (isLoading) return;
    const radiusInMeters = (region.latitudeDelta * 98000) / 2;
    if (location) {
      const distance = getDistance(
        location.latitude,
        location.longitude,
        region.latitude,
        region.longitude
      );
      if (Math.abs(radiusInMeters - radius) >= 100 || distance >= 100) {
        setRadius(radiusInMeters);
        setLocation({ latitude: region.latitude, longitude: region.longitude });
        setRegion(region);
      }
    }
  };

  /**
   * Gets the current location of the user.
   */
  const getActualLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
    const region: Region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: (radius * 2) / 98000,
      longitudeDelta: 0.005,
    };
    setInitialRegion(region);
    setRegion(region);
  };

  /**
   * Initializes the map by getting the user's current location.
   */
  useEffect(() => {
    const initializeMap = async () => {
      await getActualLocation();
    };
    initializeMap();
  }, []);

  /**
   * Retrieves points for the given lighted streets.
   * @param lightedStreets - Array of lighted streets.
   * @returns A promise that resolves to an array of LightedStreetRouteInfo.
   */
  const getPoints = async (
    lightedStreets: LightedStreet[]
  ): Promise<LightedStreetRouteInfo[]> => {
    try {
      const pointsPromises = lightedStreets.map(async (street) => {
        const point = await streetPointsRepository.getStreetPoints(
          street.startCoords,
          street.endCoords
        );
        point.rating = street.rating;
        point.streetId = street.id;
        return point;
      });
      return await Promise.all(pointsPromises);
    } catch (error: any) {
      console.log(error);
      return [];
    }
  };

  /**
   * Refreshes the map of lighted streets based on the given radius.
   * @param radius - The radius to search for lighted streets.
   */
  const refreshMap = async (radius: number) => {
    setIsLoading(true);
    if (location) {
      const lightedStreets = await getLightedStreets(
        location.latitude,
        location.longitude,
        radius
      );

      const newLightedStreetPoints: LightedStreetRouteInfo[] = await getPoints(
        lightedStreets
      );

      if (newLightedStreetPoints.length > 0) {
        await AsyncStorage.setItem(
          "lightedStreets",
          JSON.stringify(newLightedStreetPoints)
        );
        setStreetsPoints(newLightedStreetPoints);
      } else {
        const lightedStreets = await AsyncStorage.getItem("lightedStreets");
        if (lightedStreets) {
          setStreetsPoints(JSON.parse(lightedStreets));
        }
      }
    }
    setIsLoading(false);
  };

  /**
   * Retrieves the list of lighted streets within a given radius.
   * @param latitude - Latitude of the center point.
   * @param longitude - Longitude of the center point.
   * @param radius - The radius to search for lighted streets.
   * @returns A promise that resolves to an array of LightedStreet.
   */
  const getLightedStreets = async (
    latitude: number,
    longitude: number,
    radius: number
  ): Promise<LightedStreet[]> => {
    try {
      return await lightedStreetsRepository.getLightedStreets(
        latitude,
        longitude,
        radius
      );
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        error as AxiosError;
        if (error.code === axios.AxiosError.ERR_NETWORK) {
          showErrorMessage("Sin conexión a internet", () => refreshMap(radius));
        } else {
          showErrorMessage("No se puede conectar con el servidor", () =>
            refreshMap(radius)
          );
        }
      }
    }
    return [];
  };

  /**
   * Refreshes the map when the location or radius changes.
   */
  useEffect(() => {
    if (location) {
      refreshMap(radius);
    }
  }, [location, radius]);

  /**
   * Handles the action when the add lighted streets button is pressed.
   */
  const onPressAddLightedStreetsButton = () => {
    router.push("/select_map_points_location");
  };

  return {
    refreshMap,
    initialRegion,
    onChangeRadius,
    isLoading,
    radius,
    lightedStreetsPoints,
    location,
    onPressAddLightedStreetsButton,
  };
};
