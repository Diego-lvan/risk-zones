import { SaveCheckpointErrorScreen } from "@/src/checkpoint/ui/screens/error_saving_checkpoint_screen";
import { UnknownOutputParams, useLocalSearchParams } from "expo-router";

export default function SaveCheckpointError() {
  const { known_error, message } = useLocalSearchParams<{
    known_error?: string;
    message?: string;
  }>();

  const isKnownError = known_error ? known_error === "true" : false;
  const errorMessage = message
    ? message.split("_").join(" ")
    : "Error al guardar el checkpoint, intenta más tarde";

  return (
    <SaveCheckpointErrorScreen
      isKnownError={isKnownError}
      errorMessage={errorMessage}
    />
  );
}
