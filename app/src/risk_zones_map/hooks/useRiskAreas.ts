import { Region } from "react-native-maps";
import { RiskAreasDatasourceImplProd } from "../infraestructure/datasources/prod/risk_areas_datasource";
import { RiskAreasRepositoryImpl } from "../infraestructure/repositories/risk_areas_repository";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { RiskPoint } from "../domain/entities/risk_point_entity";
import { Alert } from "react-native";
import axios from "axios";
import { router } from "expo-router";

const RiskAreasRepository = new RiskAreasRepositoryImpl(
  new RiskAreasDatasourceImplProd()
);

export interface LatLng {
  latitude: number;
  longitude: number;
}

export const useRiskAreas = () => {
  const [location, setLocation] = useState<LatLng | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialRegion, setInitialRegion] = useState<Region | undefined>();
  const [radius, setRadius] = useState<number>(20000);
  const [points, setPoints] = useState<LatLng[]>([]);
  const [riskPoints, setRiskPoints] = useState<RiskPoint[]>([]);

  const onChangeRadius = (region: Region) => {
    if (isLoading) return;
    const radiusInMeters = (region.latitudeDelta * 98000) / 2;
    setRadius(radiusInMeters);
    setLocation({ latitude: region.latitude, longitude: region.longitude });
    refreshMap(radiusInMeters);
  };

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

  useEffect(() => {
    if (location === null) {
      getActualLocation();
      refreshMap(radius);
    }
  }, []);

  const refreshMap = async (radius: number) => {
    setIsLoading(true);
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
        }
      }
      return [];
    };
    if (location) {
      const riskPoints = await getRiskPoints(
        location.latitude,
        location.longitude,
        radius
      );
      setRiskPoints(riskPoints);
      const newPoints: LatLng[] = riskPoints.map((riskPoint) => {
        return {
          latitude: riskPoint.coords.latitude,
          longitude: riskPoint.coords.longitude,
        };
      });
      setPoints(newPoints);
    }
    setIsLoading(false);
  };

  const onPressAddNewsButton = () => {
    router.push("/add_news");
  };

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
