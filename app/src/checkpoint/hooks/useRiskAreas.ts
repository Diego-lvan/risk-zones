import { Region } from "react-native-maps";
import { RiskAreasDatasourceImplProd } from "../../risk_zones_map/infraestructure/datasources/prod/risk_areas_datasource";
import { RiskAreasRepositoryImpl } from "../../risk_zones_map/infraestructure/repositories/risk_areas_repository";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { RiskPoint } from "../../risk_zones_map/domain/entities/risk_point_entity";
import { Alert } from "react-native";
import axios, { AxiosError } from "axios";
import { router } from "expo-router";
import { Checkpoint } from "../domain/entities/checkpoint";
import { CheckpointRepositoryImpl } from "../infrastructure/repositories/checkpoint_repository";
import { CheckpointDataSourceImpl } from "../infrastructure/datasources/checkpoint_datasource";
import { CheckpointEntity } from "../domain/entities/checkpoint_entity";
import { useUser } from "@/src/user/context/user_context";

const CheckpointRepository = new CheckpointRepositoryImpl(new CheckpointDataSourceImpl());
// Interface usada en el mapa de calor
export interface LatLngName {
  latitude: number;
  longitude: number;
  name: string;
}

// Hook personalizado usado para controlar la pantalla del mapa de zonas de riesgo
export const useRiskAreas = () => {
  const [location, setLocation] = useState<LatLngName | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialRegion, setInitialRegion] = useState<Region | undefined>();
  const [radius, setRadius] = useState<number>(20000);
  const [points, setPoints] = useState<LatLngName[]>([]);
  const [checkpoints, setCheckpoints] = useState<CheckpointEntity[]>([]);

  // Función que detecta cuando el usuario mueve el mapa y calcula el radio en base a la pantalla
  const onChangeRadius = (region: Region) => {
    if (isLoading) return;
    const radiusInMeters = (region.latitudeDelta * 98000) / 2;
    setRadius(radiusInMeters);
    setLocation({ latitude: region.latitude, longitude: region.longitude, name: "" });
  };

  // Función que obtiene la uicación actual del usuario
  const getActualLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLocation({ ...location.coords, name: "" });
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

  const getCheckpoints = async (userId: string): Promise<CheckpointEntity[]> => {
    try {
      return await CheckpointRepository.fetchCheckpoints(userId);
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
  const { user } = useUser();

  // Función usada para refrescar el mapa de zonas de riesgo en base al radio
  const refreshMap = async (radius: number) => {
    setIsLoading(true);
    if (location) {
      const checkpoints = await getCheckpoints(user?.id || "");
      setCheckpoints(checkpoints);
      const newPoints: LatLngName[] = checkpoints.map((checkpoint) => {
        return {
          latitude: checkpoint.coords.latitude,
          longitude: checkpoint.coords.longitude,
          name: checkpoint.name,
        };
      });
      setPoints(newPoints);
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
    checkpoints,
    onPressAddNewsButton,
    handlePressNewsDetails,
  };
};
