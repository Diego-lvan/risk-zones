import SaveLigthingReportConfirmation from "@/src/lighting_report/ui/screens/error_saving_ligthingreport_screen";
import SaveNewsConfirmation from "@/src/news/ui/screens/error_saving_news_screen";
import { useState } from "react";
export default function NewsSaved() {
  const [isModalVisible, setModalVisible] = useState(true);

  const handleClose = () => {
    setModalVisible(false);
  };
  return (
    <SaveLigthingReportConfirmation
      isVisible={isModalVisible}
      onClose={handleClose}
    />
  );
}
