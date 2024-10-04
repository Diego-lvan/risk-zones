import { StyleSheet, Text, View } from "react-native";
import { CustomTextInput } from "./custom_text_input";
import { SendFormButton } from "./send_form_button";
interface ContactFormModalProps {
  showModal: boolean;
  setIsModalVisible: (value: boolean) => void;
  setIsActiveRoute: (value: boolean) => void;
}
export const ContactFormModal = ({ showModal, setIsModalVisible, setIsActiveRoute }: ContactFormModalProps) => {
  if (!showModal) return null;
  const handlePressStartRoute = () => {
    // logica cuando se inicia el recorrido
    setIsModalVisible(false);
    setIsActiveRoute(true);
  };
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modal}>
        <CustomTextInput label="Ingresa tu número de contacto" textInputProps={{}} />
        <SendFormButton handleOnPress={handlePressStartRoute} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center", // Centra verticalmente
    alignItems: "center", // Centra horizontalmente
    backgroundColor: "rgba(0,0,0,0.5)", // Añade un fondo semi-transparente
  },
  modal: {
    width: "80%", // Ajusta el ancho del modal
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    elevation: 10, // Añade sombra
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
});
