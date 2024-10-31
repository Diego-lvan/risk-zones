import { createContext, PropsWithChildren, useContext, useState } from "react";
import { LightedStreetRouteInfo } from "../domain/entities/lighted_street_route_info";

interface LightedStreetsContextType {
  lightedStreetsPoints: LightedStreetRouteInfo[];
  setStreetsPoints: (points: LightedStreetRouteInfo[]) => void;
}

export const LightedStreetsContext = createContext<LightedStreetsContextType>({
  lightedStreetsPoints: [],
  setStreetsPoints: () => {},
});

type LightedStreetsProviderProps = PropsWithChildren<{}>;

export const LightedStreetsProvider = ({
  children,
}: LightedStreetsProviderProps) => {
  const [lightedStreetsPoints, setLightedStreetsPoints] = useState<
    LightedStreetRouteInfo[]
  >([]);

  const setStreetsPoints = (points: LightedStreetRouteInfo[]) => {
    setLightedStreetsPoints(points);
  };

  const value = {
    lightedStreetsPoints,
    setStreetsPoints,
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
