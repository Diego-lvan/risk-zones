import { ApiError } from "@/src/common/errors/api_error";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useRef } from "react";
import {
  LightingReportForm,
  useValidatedForm,
} from "./useValidateLigthingReportForm";
import { SaveLightingReportUseCase } from "../domain/use_cases/save_lighting_report_use_case";

export const useSaveLightingReport = () => {
  const saveLightingReportUseCase = useRef(
    new SaveLightingReportUseCase()
  ).current;

  const onSuccessfulSave = () => {
    router.push("/lighting_report_saved");
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
    mutationFn: (data: LightingReportForm) =>
      saveLightingReportUseCase.execute(data),
    onSuccess: onSuccessfulSave,
    onError: onErrorSave,
  });
  const onSubmitCallback = async (data: LightingReportForm) => {
    await mutation.mutateAsync(data);
  };

  const { updateValue, onSubmit, errors } = useValidatedForm({
    onSubmitCallback,
  });

  return { updateValue, onSubmit, errors, mutation };
};
