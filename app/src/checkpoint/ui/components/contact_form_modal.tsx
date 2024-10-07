import { Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { CustomTextInput } from "./custom_text_input";
import { SendFormButton } from "./send_form_button";
import { useFormNotification } from "../../hooks/useSendNotification";
import { set } from "react-hook-form";
import { CancelFormButton } from "./cancel_form_button";

interface ContactFormModalProps {
  showModal: boolean;
  setIsModalVisible: (value: boolean) => void;
  setIsActiveRoute: (value: boolean) => void;
  handleContactPhoneChange: (text: string) => void;
  handlePressStartRoute: () => void;
  toggleShowModal: () => void;
}

export const ContactFormModal = ({
  showModal,
  handleContactPhoneChange,
  handlePressStartRoute,
  toggleShowModal,
}: ContactFormModalProps) => {
  if (!showModal) return null;

  return (
    <View style={styles.modalContainer}>
      <Pressable style={styles.emptyView} onPress={toggleShowModal}></Pressable>
      <View style={styles.modal}>
        <CustomTextInput
          label="Ingresa tu número de contacto"
          textInputProps={{
            onChangeText: handleContactPhoneChange,
          }}
        />
        <View style={styles.buttonContainer}>
          <CancelFormButton text="Cancelar" handleOnPress={toggleShowModal} />
          <SendFormButton text="Aceptar" handleOnPress={handlePressStartRoute} />
        </View>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    elevation: 10,
  },
  message: {
    fontSize: 16,
    marginTop: 10,
    color: "gray",
  },
  emptyView: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  buttonContainer: {
    flexDirection: "row", // Coloca los botones en fila
    justifyContent: "space-between", // Distribuye el espacio entre los botones
    marginTop: 20, // Espacio superior opcional
  },
});
