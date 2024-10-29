import { useEffect, useState } from "react";
import { LightedStreetsDatasourceImpl } from "../infraestructure/datasources/lighted_streets_datasource";
import { LightedStreetsRepositoryImpl } from "../infraestructure/repositories/lighted_streets_repository";
import * as Location from "expo-location";
import { LatLng } from "@/src/risk_zones_map/hooks/useRiskAreas";
import { Region } from "react-native-maps";
import { LightedStreet } from "../domain/entities/lighted_street";
import axios, { AxiosError } from "axios";
import { showErrorMessage } from "@/src/common/errors/error_message";
import { LightedStreetPoints } from "../domain/entities/lighted_street_points";
import { StreetPointsRepositoryImpl } from "../infraestructure/repositories/street_points_repository";
import { StreetPointsDatasourceImpl } from "../infraestructure/datasources/street_points_datasource";

const lightedStreetsRepository = new LightedStreetsRepositoryImpl(
  new LightedStreetsDatasourceImpl()
);

const streetPointsRepository = new StreetPointsRepositoryImpl(
  new StreetPointsDatasourceImpl()
);

export const useLightedStreets = () => {
  const [location, setLocation] = useState<LatLng | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialRegion, setInitialRegion] = useState<Region | undefined>();
  const [radius, setRadius] = useState<number>(200);
  const [lightedStreetsPoints, setLightedStreetsPoints] = useState<
    LightedStreetPoints[]
  >([]);

  // Función que detecta cuando el usuario mueve el mapa y calcula el radio en base a la pantalla
  const onChangeRadius = (region: Region) => {
    if (isLoading) return;
    const radiusInMeters = (region.latitudeDelta * 98000) / 2;
    if (Math.abs(radiusInMeters - radius) >= 50) {
      setRadius(radiusInMeters);
      setLocation({ latitude: region.latitude, longitude: region.longitude });
    }
  };

  // Función que obtiene la uicación actual del usuario
  const getActualLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
    setInitialRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: (radius * 2) / 98000,
      longitudeDelta: 0.005,
    });
  };

  // Función que se ejecuta por primera vez que se carga el mapa
  // Obtiene la ubicación actual del usuario
  useEffect(() => {
    const initializeMap = async () => {
      await getActualLocation();
    };
    initializeMap();
  }, []);

  const getPoints = async (
    lightedStreets: LightedStreet[]
  ): Promise<LightedStreetPoints[]> => {
    try {
      const pointsPromises = lightedStreets.map(async (street) => {
        return await streetPointsRepository.getStreetPoints(
          street.startCoords,
          street.endCoords
        );
      });
      return await Promise.all(pointsPromises);
    } catch (error: any) {
      console.error(error);
      return [];
    }
    return [];
  };

  // Función usada para refrescar el mapa de calles iluminadas en base al radio
  const refreshMap = async (radius: number) => {
    setIsLoading(true);
    if (location) {
      const lightedStreets = await getLightedStreets(
        location.latitude,
        location.longitude,
        radius
      );

      const newLightedStreetPoints: LightedStreetPoints[] = await getPoints(
        lightedStreets
      );
      setLightedStreetsPoints(newLightedStreetPoints);
    }
    setIsLoading(false);
  };

  // Función que obtiene la lista de calles iluminadas
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

  // Función que se ejecuta cuando cambia la ubicación en el mapa
  // Refresca el mapa de zonas inseguras alrededor de la ubicación
  useEffect(() => {
    if (location) {
      refreshMap(radius);
    }
  }, [location, radius]);

  return {
    refreshMap,
    initialRegion,
    onChangeRadius,
    isLoading,
    radius,
    lightedStreetsPoints,
    location,
  };
};
