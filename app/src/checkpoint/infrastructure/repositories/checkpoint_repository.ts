import { CheckpointDataSource } from "../../domain/datasources/checkpoint_datasource";
import { CheckpointEntity } from "../../domain/entities/checkpoint_entity";
import { CheckpointRepository } from "../../domain/repositories/checkpoint_repository";

export class CheckpointRepositoryImpl implements CheckpointRepository {
  private readonly dataSource: CheckpointDataSource;

  constructor(dataSource: CheckpointDataSource) {
    this.dataSource = dataSource;
  }
  async saveCheckpoint(checkpoint: CheckpointEntity): Promise<void> {
    return await this.dataSource.saveCheckpoint(checkpoint);
  }

  async fetchCheckpoints(userId: string): Promise<CheckpointEntity[]> {
    return await this.dataSource.fetchCheckpoints(userId);
  }
}
