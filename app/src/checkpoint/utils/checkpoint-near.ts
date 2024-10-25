import { Checkpoint } from "../domain/entities/checkpoint";
import { CheckpointEntity } from "../domain/entities/checkpoint_entity";
import { CheckpointRes } from "../hooks/useSendNotification";
import haversine from "haversine";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export const checkpointNear = (checkpoint: Checkpoint[], curLocation: Coordinates): number | null => {
  for (let i = 0; i < checkpoint.length; i++) {
    const checkpointCoords: Coordinates = {
      latitude: checkpoint[i].coords.latitude,
      longitude: checkpoint[i].coords.longitude,
    };
    const distance = haversine(curLocation, checkpointCoords, { unit: "meter" });
    console.log(`Distance to checkpoint ${checkpoint[i].name}: ${distance} meters`);
    if (distance <= 30) {
      return checkpoint[i].id.valueOf();
    }
  }

  return null;
};
