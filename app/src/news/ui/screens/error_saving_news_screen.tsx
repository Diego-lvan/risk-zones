import { Modal, View, Text, StyleSheet } from "react-native";
import { CustomEndButton } from "../../../../src/checkpoint/ui/components/custom_end_button";
import { APP_THEME } from "@/common/theme/theme";
import { router } from "expo-router";

interface SaveNewsConfirmationProps {
  isVisible: boolean;
  onClose: () => void;
  message?: string;
}

export const SaveNewsConfirmation = ({
  isVisible,
  onClose,
  message,
}: SaveNewsConfirmationProps) => {
  const handlePress = () => {
    onClose();
    router.dismissAll();
  };
  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Noticia subida correctamente</Text>
          <CustomEndButton onPress={handlePress} message="Aceptar" />
        </View>
      </View>
    </Modal>
  );
};

export default SaveNewsConfirmation;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro transparente
  },
  modalContainer: {
    width: 300, // Ancho de la ventana emergente
    padding: 20,
    backgroundColor: APP_THEME.colors.background, // Color de fondo del modal
    borderRadius: 10,
    alignItems: "center",
    gap: 15,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: "green", // Cambia a verde para indicar éxito
  },
});
