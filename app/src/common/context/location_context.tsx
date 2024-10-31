import { CoordEntity } from "@/src/risk_zones_map/domain/entities/coordinate_entity";
import { createContext, useContext, useState } from "react";

interface LocationContextType {
  location: CoordEntity | null;
  setLocation: (location: CoordEntity) => void;
  resetLocation: () => void;
}

export const LocationContext = createContext<LocationContextType>({
  location: null,
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

export const useSelectLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useSelectLocation must be used within a LocationProvider");
  }
  return context;
};
