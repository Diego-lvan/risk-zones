import { CheckpointEntity } from "../entities/checkpoint_entity";

export interface CheckpointDataSource {
  saveCheckpoint(checkpoint: CheckpointEntity): Promise<void>;
  fetchCheckpoints(userId: string): Promise<CheckpointEntity[]>;
  deleteCheckpoint(id: number): Promise<void>;
}
