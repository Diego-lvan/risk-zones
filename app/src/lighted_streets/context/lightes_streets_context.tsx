import { createContext, PropsWithChildren, useContext, useState } from "react";
import { LightedStreetPoints } from "../domain/entities/lighted_street_points";

interface LightedStreetsContextType {
  lightedStreetsPoints: LightedStreetPoints[];
  setStreetsPoints: (points: LightedStreetPoints[]) => void;
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
    LightedStreetPoints[]
  >([]);

  const setStreetsPoints = (points: LightedStreetPoints[]) => {
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
