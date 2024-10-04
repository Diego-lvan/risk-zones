import { CoordEntity } from "@/src/risk_zones_map/domain/entities/coordinate_entity";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

export const useUserLocation = () => {
  const getUserLocation = async (callback: (coords: CoordEntity) => void) => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    callback(location.coords);
  };

  return { getUserLocation };
};
