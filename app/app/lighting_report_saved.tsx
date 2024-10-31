import SaveNewsConfirmation from "@/src/news/ui/screens/error_saving_news_screen";
import { useState } from "react";
export default function LightingReportSaved() {
  const [isModalVisible, setModalVisible] = useState(true);

  const handleClose = () => {
    setModalVisible(false);
  };
  return (
    <SaveNewsConfirmation
      isVisible={isModalVisible}
      onClose={handleClose}
      message="Reporte subido correctamente"
    />
  );
}
