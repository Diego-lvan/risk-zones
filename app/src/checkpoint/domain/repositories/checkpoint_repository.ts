import { CheckpointEntity } from "../entities/checkpoint_entity";

export interface CheckpointRepository {
  saveCheckpoint(checkpoint: CheckpointEntity): Promise<void>;
  fetchCheckpoints(userId: string): Promise<CheckpointEntity[]>;
}
