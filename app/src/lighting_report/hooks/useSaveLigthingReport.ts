import { ApiError } from "@/src/common/errors/api_error";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  LightingReportForm,
  useValidatedForm,
} from "./useValidateLigthingReportForm";
import { SaveLightingReportUseCase } from "../domain/use_cases/save_lighting_report_use_case";
import { Alert } from "react-native";
import { useSelectLocationTwoPoints } from "@/src/common/context/location_two_points_context";
import { useLightedStreetsContext } from "@/src/lighted_streets/context/lightes_streets_context";
import { LightedStreetRouteInfo } from "@/src/lighted_streets/domain/entities/lighted_street_route_info";
import { CoordEntity } from "@/src/risk_zones_map/domain/entities/coordinate_entity";
import { MapPressEvent } from "react-native-maps";
import { StreetPointsRepositoryImpl } from "@/src/lighted_streets/infraestructure/repositories/street_points_repository";
import { StreetPointsDatasourceImpl } from "@/src/lighted_streets/infraestructure/datasources/street_points_datasource";

const streetPointsRepository = new StreetPointsRepositoryImpl(
  new StreetPointsDatasourceImpl()
);

export const useSaveLightingReport = () => {
  const saveLightingReportUseCase = useRef(
    new SaveLightingReportUseCase()
  ).current;

  const onSuccessfulSave = () => {
    router.push("/lighting_report_saved");
  };

  const onErrorSave = (error: Error) => {
    if (error instanceof ApiError) {
      if (error.statusCode >= 401) {
        router.push("/save_news_error?known_error=false");
      } else {
        router.push(
          `/save_news_error?known_error=true&message=${error.message
            .split(" ")
            .join("_")}`
        );
      }
    } else {
      router.push("/save_news_error?known_error=false");
    }
  };
  const mutation = useMutation({
    mutationFn: (data: LightingReportForm) =>
      saveLightingReportUseCase.execute(data),
    onSuccess: onSuccessfulSave,
    onError: onErrorSave,
  });
  const onSubmitCallback = async (data: LightingReportForm) => {
    await mutation.mutateAsync(data);
  };

  const { updateValue, onSubmit, errors } = useValidatedForm({
    onSubmitCallback,
  });

  const { startCoords, endCoords, setLocation } = useSelectLocationTwoPoints();
  const [tempStartCoords, setTempStartCoords] = useState<CoordEntity | null>(
    null
  );
  const [tempEndCoords, setTempEndCoords] = useState<CoordEntity | null>(null);
  const isLocationSet = useRef(false);
  const { lightedStreetsPoints, actualRegion } = useLightedStreetsContext();
  const [previewRoute, setPreviewRoute] =
    useState<LightedStreetRouteInfo | null>(null);

  const handleMapPress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setPreviewRoute(null);

    if (!tempStartCoords) {
      setTempStartCoords({ latitude, longitude });
    } else if (!tempEndCoords) {
      setTempEndCoords({ latitude, longitude });
      isLocationSet.current = true;
    } else {
      setTempStartCoords(tempEndCoords);
      setTempEndCoords({ latitude, longitude });
      isLocationSet.current = true;
    }
  };

  const getRoute = () => {
    const getAsyncRoute = async () => {
      if (tempStartCoords && tempEndCoords) {
        try {
          const routeInfo = await streetPointsRepository.getStreetPoints(
            tempStartCoords,
            tempEndCoords
          );
          if (routeInfo.distance > 2000) {
            Alert.alert("Error", "La distancia no debe ser mayor a 2km");
            return;
          }
          setPreviewRoute(routeInfo);
        } catch (error: any) {
          console.error(error);
        }
      }
    };
    getAsyncRoute();
  };

  const handleMarkerPress = (type: "start" | "end") => {
    if (type === "start") {
      setTempStartCoords(null);
    } else if (type === "end") {
      setTempEndCoords(null);
    }
  };

  const handleSave = () => {
    if (!tempStartCoords || !tempEndCoords) {
      Alert.alert("Error", "Selecciona dos puntos en el mapa");
      return;
    }

    setLocation(tempStartCoords, tempEndCoords);
    console.log("Coordenadas guardadas en contexto:", {
      tempStartCoords,
      tempEndCoords,
    });
    return true;
  };

  const handleSubmit = async () => {
    console.log("Iniciando proceso de guardado...");

    if (!tempStartCoords || !tempEndCoords) {
      Alert.alert("Error", "Selecciona dos puntos en el mapa");
      return;
    }

    try {
      // Primero guardamos en el contexto
      setLocation(tempStartCoords, tempEndCoords);

      console.log("Datos antes de enviar al backend:", {
        startCoords: tempStartCoords,
        endCoords: tempEndCoords,
      });

      const result = await onSubmit();

      console.log("Resultado de onSubmit:", result);

      // Verificamos el estado de la mutación
      if (mutation.isSuccess) {
        console.log("Respuesta del backend:", mutation.data);
        Alert.alert("Éxito", "Los datos se guardaron correctamente");
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      Alert.alert("Error", "No se pudieron guardar los datos");
    }
  };

  useEffect(() => {
    // Log para debugging
    console.log("Coordenadas actuales:", { startCoords, endCoords });
  }, [startCoords, endCoords]);

  return {
    updateValue,
    onSubmit,
    errors,
    mutation,
    handleMapPress,
    handleMarkerPress,
    tempEndCoords,
    tempStartCoords,
    lightedStreetsPoints,
    handleSubmit,
    previewRoute,
    getRoute,
    actualRegion,
  };
};
