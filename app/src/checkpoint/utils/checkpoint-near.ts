import { CheckpointRes } from "../hooks/useSendNotification";
import haversine from "haversine";

const EARTH_RADIUS = 6371e3;

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export const checkpointNear = (checkpoint: CheckpointRes[], curLocation: Coordinates): number | null => {
  for (let i = 0; i < checkpoint.length; i++) {
    const checkpointCoords: Coordinates = {
      latitude: checkpoint[i].coords.coordinates[1],
      longitude: checkpoint[i].coords.coordinates[0],
    };
    const distance = haversine(curLocation, checkpointCoords, { unit: "meter" });
    console.log(`Distance to checkpoint ${checkpoint[i].id}: ${distance} meters`);
    if (distance <= 30) {
      return checkpoint[i].id.valueOf();
    }
  }

  return null;
};
