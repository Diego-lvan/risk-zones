import { CheckpointEntity } from "../entities/checkpoint_entity";

export interface CheckpointDataSource {
  saveCheckpoint(checkpoint: CheckpointEntity): Promise<void>;
}
