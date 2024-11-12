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
export const useLoadCheckpoints = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialRegion, setInitialRegion] = useState<Region | undefined>();
  const [checkpoints, setCheckpoints] = useState<CheckpointEntity[]>([]);

  // Función que obtiene la uicación actual del usuario
  const getActualLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setInitialRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.005,
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
                onPress: () => refreshMap(),
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
                onPress: () => refreshMap(),
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

  const refreshMap = async () => {
    console.log("refreshMap");
    setIsLoading(true);
    const checkpoints = await getCheckpoints(user?.id || "");
    setCheckpoints(checkpoints);
    setIsLoading(false);
  };

  return {
    refreshMap,
    initialRegion,
    isLoading,
    checkpoints,
    setCheckpoints,
  };
};
