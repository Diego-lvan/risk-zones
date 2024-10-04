import { CheckpointForm } from "../../hooks/useSaveCheckpoint";
import { CheckpointEntity } from "../entities/checkpoint_entity";

export class SaveCheckpointUseCase {
  //private checkpointRepository: CheckpointRepository;
  constructor() {
    //this.checkpointRepository = new CheckpointRepository();
  }
  public async execute(checkpoint: CheckpointForm) {
    try {
      const checkpointEntity = this.validate(checkpoint);
      //await this.checkpointRepository.saveCheckpoint(checkpoint);
    } catch (error) {
      console.log(error);
      throw new Error("Error saving checkpoint");
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

    return {
      name: checkpoint.name,
      coords: {
        latitude: checkpoint.latitude,
        longitude: checkpoint.longitude,
      },
    };
  }
}
