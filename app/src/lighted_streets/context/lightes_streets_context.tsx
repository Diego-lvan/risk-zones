import { createContext, PropsWithChildren, useContext, useState } from "react";
import { LightedStreetRouteInfo } from "../domain/entities/lighted_street_route_info";
import { Region } from "react-native-maps";

interface LightedStreetsContextType {
  lightedStreetsPoints: LightedStreetRouteInfo[];
  actualRegion: Region | undefined;
  setStreetsPoints: (points: LightedStreetRouteInfo[]) => void;
  setRegion: (region: Region) => void;
}

export const LightedStreetsContext = createContext<LightedStreetsContextType>({
  lightedStreetsPoints: [],
  actualRegion: undefined,
  setStreetsPoints: () => {},
  setRegion: () => {},
});

type LightedStreetsProviderProps = PropsWithChildren<{}>;

export const LightedStreetsProvider = ({
  children,
}: LightedStreetsProviderProps) => {
  const [lightedStreetsPoints, setLightedStreetsPoints] = useState<
    LightedStreetRouteInfo[]
  >([]);
  const [actualRegion, setActualRegion] = useState<Region | undefined>();

  const setStreetsPoints = (points: LightedStreetRouteInfo[]) => {
    setLightedStreetsPoints(points);
  };

  const setRegion = (region: Region) => {
    setActualRegion(region);
  };

  const value = {
    lightedStreetsPoints,
    setStreetsPoints,
    setRegion,
    actualRegion,
  };

  return (
    <LightedStreetsContext.Provider value={value}>
      {children}
    </LightedStreetsContext.Provider>
  );
};

export const useLightedStreetsContext = () => {
  const context = useContext(LightedStreetsContext);
  if (!context) {
    throw new Error(
      "useLightedStreetsContext must be used within a LightedStreetsProvider"
    );
  }
  return context;
};
