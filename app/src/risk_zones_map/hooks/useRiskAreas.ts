import { Region } from "react-native-maps";
import { RiskAreasDatasourceImplProd } from "../infraestructure/datasources/prod/risk_areas_datasource";
import { RiskAreasRepositoryImpl } from "../infraestructure/repositories/risk_areas_repository";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { RiskPoint } from "../domain/entities/risk_point_entity";
import { Alert } from "react-native";
import axios, { AxiosError } from "axios";
import { router } from "expo-router";
import * as SecureStorage from "expo-secure-store";

const RiskAreasRepository = new RiskAreasRepositoryImpl(
  new RiskAreasDatasourceImplProd()
);

// Interface usada en el mapa de calor
export interface LatLng {
  latitude: number;
  longitude: number;
}

// Hook personalizado usado para controlar la pantalla del mapa de zonas de riesgo
export const useRiskAreas = () => {
  const [location, setLocation] = useState<LatLng | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialRegion, setInitialRegion] = useState<Region | undefined>();
  const [radius, setRadius] = useState<number>(20000);
  const [points, setPoints] = useState<LatLng[]>([]);
  const [riskPoints, setRiskPoints] = useState<RiskPoint[]>([]);

  // Función que detecta cuando el usuario mueve el mapa y calcula el radio en base a la pantalla
  const onChangeRadius = (region: Region) => {
    if (isLoading) return;
    const radiusInMeters = (region.latitudeDelta * 98000) / 2;
    setRadius(radiusInMeters);
    setLocation({ latitude: region.latitude, longitude: region.longitude });
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

  // Función que se ejecuta cuando cambia la ubicación en el mapa
  // Refresca el mapa de zonas inseguras alrededor de la ubicación
  useEffect(() => {
    if (location) {
      refreshMap(radius);
    }
  }, [location, radius]);

  const getRiskPoints = async (
    latitude: number,
    longitude: number,
    radius: number
  ): Promise<RiskPoint[]> => {
    try {
      return await RiskAreasRepository.getRiskPoints(
        latitude,
        longitude,
        radius
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        error as AxiosError;
        if (error.code === axios.AxiosError.ERR_NETWORK) {
          Alert.alert(
            "Error",
            "Sin conexión a internet",
            [
              {
                text: "Volver a intentar",
                onPress: () => refreshMap(radius),
              },
              {
                text: "Cerrar",
                style: "cancel",
              },
            ],
            { cancelable: false }
          );
        } else {
          Alert.alert(
            "Error",
            "No se puede conectar con el servidor",
            [
              {
                text: "Volver a intentar",
                onPress: () => refreshMap(radius),
              },
              {
                text: "Cerrar",
                style: "cancel",
              },
            ],
            { cancelable: false }
          );
        }
      }
    }
    return [];
  };

  // Función usada para refrescar el mapa de zonas de riesgo en base al radio
  const refreshMap = async (radius: number) => {
    setIsLoading(true);
    if (location) {
      const newRiskPoints = await getRiskPoints(
        location.latitude,
        location.longitude,
        radius
      );
      if (newRiskPoints.length > 0) {
        setRiskPoints(newRiskPoints);
        const newPoints: LatLng[] = newRiskPoints.map((riskPoint) => {
          return {
            latitude: riskPoint.coords.latitude,
            longitude: riskPoint.coords.longitude,
          };
        });
        await SecureStorage.setItemAsync(
          "riskPoints",
          JSON.stringify(newRiskPoints)
        );
        setPoints(newPoints);
      } else if (riskPoints.length === 0) {
        const savedPoints = await SecureStorage.getItemAsync("riskPoints");
        if (savedPoints) {
          const parsedPoints = JSON.parse(savedPoints) as RiskPoint[];
          setRiskPoints(parsedPoints);
          const newPoints: LatLng[] = parsedPoints.map((riskPoint) => {
            return {
              latitude: riskPoint.coords.latitude,
              longitude: riskPoint.coords.longitude,
            };
          });
          setPoints(newPoints);
        }
      }
    }
    setIsLoading(false);
  };

  // Función que se realiza al presionar el botón de añadir noticia
  const onPressAddNewsButton = () => {
    router.push("/add_news");
  };

  // Función para ser usada cuando se desee conocer los detalles de una noticia
  const handlePressNewsDetails = () => {};

  return {
    refreshMap,
    initialRegion,
    onChangeRadius,
    radius,
    isLoading,
    points,
    location,
    riskPoints,
    onPressAddNewsButton,
    handlePressNewsDetails,
  };
};
