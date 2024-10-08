import SaveNewsConfirmation from "@/src/news/ui/screens/error_saving_news_screen";
import { NewsSavedScreen } from "../src/news/ui/screens/news_saved";
import { useState } from "react";
export default function NewsSaved() {
  const [isModalVisible, setModalVisible] = useState(true);

  const handleClose = () => {
    setModalVisible(false);
  };
  return (
    <SaveNewsConfirmation isVisible={isModalVisible} onClose={handleClose} />
  );
}
