import { SaveNewsConfirmation } from "@/src/news/ui/screens/error_saving_news_screen";
import { UnknownOutputParams, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function SaveNewsError() {
  const { known_error, message } = useLocalSearchParams<{
    known_error?: string;
    message?: string;
  }>();

  const [isModalVisible, setModalVisible] = useState(true);

  const isKnownError = known_error ? known_error === "true" : false;
  const errorMessage = message
    ? message.split("_").join(" ")
    : "Error al guardar la noticia, intenta más tarde";

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <SaveNewsConfirmation
      isVisible={isModalVisible}
      onClose={handleCloseModal}
    />
  );
}
