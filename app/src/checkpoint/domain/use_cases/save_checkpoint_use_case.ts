import { ApiError } from "@/src/common/errors/api_error";
import { CheckpointForm } from "../../hooks/useSaveCheckpoint";
import { CheckpointDataSourceImpl } from "../../infrastructure/datasources/checkpoint_datasource";
import { CheckpointRepositoryImpl } from "../../infrastructure/repositories/checkpoint_repository";
import { CheckpointEntity } from "../entities/checkpoint_entity";
import { CheckpointRepository } from "../repositories/checkpoint_repository";

export class SaveCheckpointUseCase {
  private checkpointRepository: CheckpointRepository;
  constructor() {
    const datasource = new CheckpointDataSourceImpl();
    this.checkpointRepository = new CheckpointRepositoryImpl(datasource);
  }
  public async execute(checkpoint: CheckpointForm) {
    try {
      const checkpointEntity = this.validate(checkpoint);
      await this.checkpointRepository.saveCheckpoint(checkpointEntity);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Error saving checkpoint", 500);
    }
  }

  private validate(checkpoint: CheckpointForm): CheckpointEntity {
    if (!checkpoint.name || checkpoint.name.length < 3) {
      throw new Error("Invalid name");
    }
    if (
      !checkpoint.latitude ||
      checkpoint.latitude < -90 ||
      checkpoint.latitude > 90
    ) {
      throw new Error("Invalid latitude");
    }
    if (
      !checkpoint.longitude ||
      checkpoint.longitude < -180 ||
      checkpoint.longitude > 180
    ) {
      throw new Error("Invalid longitude");
    }

    if (!checkpoint.userId) {
      throw new Error("Invalid user");
    }

    return {
      name: checkpoint.name,
      coords: {
        latitude: checkpoint.latitude,
        longitude: checkpoint.longitude,
      },
      userId: checkpoint.userId,
    };
  }
}
