import { CoordEntity } from "@/src/risk_zones_map/domain/entities/coordinate_entity";
import { createContext, useContext, useState } from "react";

interface LocationContextType {
  location: CoordEntity | null;
  setLocation: (location: CoordEntity) => void;
  resetLocation: () => void;
}
interface LocationTwoPointsContextType {
  startCoords: CoordEntity | null;
  endCoords: CoordEntity | null;
  setLocation: (start: CoordEntity, end: CoordEntity) => void;
  resetLocation: () => void;
}

export const LocationContext = createContext<LocationContextType>({
  location: null,
  setLocation: () => {},
  resetLocation: () => {},
});

export const LocationTwoPointsContext =
  createContext<LocationTwoPointsContextType>({
    startCoords: null,
    endCoords: null,
    setLocation: () => {},
    resetLocation: () => {},
  });

export const SelectLocationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [location, setLocation] = useState<CoordEntity | null>(null);

  const resetLocation = () => setLocation(null);

  return (
    <LocationContext.Provider value={{ location, setLocation, resetLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

const SelectLocationTwoPointsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [startCoords, setStartCoords] = useState<CoordEntity | null>(null);
  const [endCoords, setEndCoords] = useState<CoordEntity | null>(null);

  const setLocation = (start: CoordEntity, end: CoordEntity) => {
    setStartCoords(start);
    setEndCoords(end);
  };

  const resetLocation = () => {
    setStartCoords(null);
    setEndCoords(null);
  };

  return (
    <LocationTwoPointsContext.Provider
      value={{ startCoords, endCoords, setLocation, resetLocation }}
    >
      {children}
    </LocationTwoPointsContext.Provider>
  );
};
export const useSelectLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useSelectLocation must be used within a LocationProvider");
  }
  return context;
};

export const useSelectLocationTwoPoints = () => {
  const context = useContext(LocationTwoPointsContext);
  if (!context) {
    throw new Error("useSelectLocation must be used within a LocationProvider");
  }
  return context;
};
