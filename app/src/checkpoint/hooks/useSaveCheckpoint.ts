import { useMutation } from "@tanstack/react-query";
import { SaveCheckpointUseCase } from "../domain/use_cases/save_checkpoint_use_case";
import { router } from "expo-router";
import { useRef } from "react";
import { ApiError } from "@/src/common/errors/api_error";
import { CheckpointForm, useValidatedForm } from "./useValidatecheckpointForm";

export const useSaveCheckpoint = () => {
  const saveCheckpointUseCase = useRef(new SaveCheckpointUseCase()).current;

  const onSuccessfulSave = () => {
    router.push("/checkpoint_saved");
  };

  const onErrorSave = (error: Error) => {
    if (error instanceof ApiError) {
      if (error.statusCode >= 401) {
        router.push("/save_checkpoint_error?known_error=false");
      } else {
        router.push(`/save_checkpoint_error?known_error=true&message=${error.message.split(" ").join("_")}`);
      }
    } else {
      router.push("/save_checkpoint_error?known_error=false");
    }
  };

  const mutation = useMutation({
    mutationFn: (data: CheckpointForm) => saveCheckpointUseCase.execute(data),
    onSuccess: onSuccessfulSave,
    onError: onErrorSave,
  });

  const onSubmitCallback = async (data: CheckpointForm) => {
    await mutation.mutateAsync(data);
  };

  const { updateValue, onSubmit, errors } = useValidatedForm({
    onSubmitCallback,
  });

  return { updateValue, onSubmit, errors, mutation };
};
