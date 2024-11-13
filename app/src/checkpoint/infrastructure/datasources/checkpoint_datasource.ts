import axios, { AxiosError } from "axios";
import { CheckpointDataSource } from "../../domain/datasources/checkpoint_datasource";
import { CheckpointEntity } from "../../domain/entities/checkpoint_entity";
import { API_URL } from "@/common/constants/api";
import { CheckpointModel } from "../models/checkpoint_models";
import { ApiError } from "@/src/common/errors/api_error";
import { Checkpoint } from "../../domain/entities/checkpoint";

interface CheckpointRes {
  id: number;
  name: string;
  coords: {
    coordinates: [number, number];
  };
}

export class CheckpointDataSourceImpl implements CheckpointDataSource {
  async saveCheckpoint(checkpoint: CheckpointEntity): Promise<void> {
    const checkpointModel: CheckpointModel = {
      name: checkpoint.name,
      latitude: checkpoint.coords.latitude,
      longitude: checkpoint.coords.longitude,
      userId: checkpoint.userId,
    };

    console.log("saveCheckpoint");
    try {
      const { status } = await axios.post(`${API_URL}/checkpoint`, checkpointModel);
      if (status !== 201) {
        throw new Error();
      }
    } catch (error) {
      const apiError = error as AxiosError;
      const message = apiError.response ? (apiError.response.data as { message: string }).message : "Error desconocido";
      throw new ApiError(message, apiError.response?.status || 500);
    }
  }

  async fetchCheckpoints(userId: string): Promise<CheckpointEntity[]> {
    console.log("fetchCheckpoints");
    try {
      const { data } = await axios.get<CheckpointRes[]>(`${API_URL}/checkpoint/user/${userId}`);
      const checkpoints: CheckpointEntity[] = data.map((checkpoint: CheckpointRes) => {
        return {
          id: checkpoint.id,
          name: checkpoint.name,
          coords: {
            latitude: checkpoint.coords.coordinates[1],
            longitude: checkpoint.coords.coordinates[0],
          },
          userId: userId,
        };
      });
      return checkpoints;
    } catch (error) {
      const apiError = error as AxiosError;
      const message = apiError.response ? (apiError.response.data as { message: string }).message : "Error desconocido";
      throw new ApiError(message, apiError.response?.status || 500);
    }
  }

  async deleteCheckpoint(id: number): Promise<void> {
    try {
      const { status } = await axios.delete(`${API_URL}/checkpoint/${id}`);
      if (status !== 200) {
        throw new Error();
      }
    } catch (error) {
      const apiError = error as AxiosError;
      const message = apiError.response ? (apiError.response.data as { message: string }).message : "Error desconocido";
      throw new ApiError(message, apiError.response?.status || 500);
    }
  }
}
