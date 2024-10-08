import { useMutation } from "@tanstack/react-query";
import { SaveNewsUseCase } from "../domain/use_cases/save_news_use_case";
import { useRef } from "react";
import { router } from "expo-router";
import { NewsForm, useValidatedForm } from "./useValidateNewsForm";
import { ApiError } from "@/src/common/errors/api_error";

export const useSaveNews = () => {
  const saveNewsUseCase = useRef(new SaveNewsUseCase()).current;

  const onSuccessfulSave = () => {
    router.push("/news_saved");
  };

  const onErrorSave = (error: Error) => {
    if (error instanceof ApiError) {
      if (error.statusCode >= 401) {
        router.push("/save_news_error?known_error=false");
      } else {
        router.push(
          `/save_news_error?known_error=true&message=${error.message
            .split(" ")
            .join("_")}`
        );
      }
    } else {
      router.push("/save_news_error?known_error=false");
    }
  };
  const mutation = useMutation({
    mutationFn: (data: NewsForm) => saveNewsUseCase.execute(data),
    onSuccess: onSuccessfulSave,
    onError: onErrorSave,
  });

  const onSubmitCallback = async (data: NewsForm) => {
    await mutation.mutateAsync(data);
  };

  const { updateValue, onSubmit, errors } = useValidatedForm({
    onSubmitCallback,
  });

  return { updateValue, onSubmit, errors };
};
