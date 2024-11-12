import { CheckpointDataSourceImpl } from "../infrastructure/datasources/checkpoint_datasource";
import { CheckpointRepositoryImpl } from "../infrastructure/repositories/checkpoint_repository";

const CheckpointRepository = new CheckpointRepositoryImpl(new CheckpointDataSourceImpl());

interface DeleteCheckpoint {
  refreshMap: () => void;
}

export const useDeleteCheckpoint = ({ refreshMap }: DeleteCheckpoint) => {
  const deleteCheckpoint = async (id: number) => {
    try {
      await CheckpointRepository.deleteCheckpoint(id);
      refreshMap();
    } catch (error) {
      console.log(error);
    }
  };
  return { deleteCheckpoint };
};
