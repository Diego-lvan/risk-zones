import { Pressable, StyleSheet, Text, View } from "react-native";
import { CustomTextInput } from "./custom_text_input";
import { SendFormButton } from "./send_form_button";
import { CancelFormButton } from "./cancel_form_button";
import { useState } from "react";

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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validatePhoneNumber = (text: string) => {
    setPhoneNumber(text);
    if (/^\d{10}$/.test(text)) {
      setErrorMessage("");
    } else if (text.length !== 10) {
      setErrorMessage("El número debe tener 10 caracteres.");
    } else if (!/^\d+$/.test(text)) {
      setErrorMessage("El número solo debe contener dígitos.");
    }
    handleContactPhoneChange(text);
  };

  if (!showModal) return null;

  return (
    <View style={styles.modalContainer}>
      <Pressable style={styles.emptyView} onPress={toggleShowModal}></Pressable>
      <View style={styles.modal}>
        <CustomTextInput
          label="Ingresa tu número de contacto"
          textInputProps={{
            onChangeText: validatePhoneNumber,
            value: phoneNumber,
          }}
        />
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        <View style={styles.buttonContainer}>
          <CancelFormButton text="Cancelar" handleOnPress={toggleShowModal} />
          <SendFormButton
            text="Aceptar"
            handleOnPress={handlePressStartRoute}
            disabled={!!errorMessage} // Desactiva el botón si hay un error
          />
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});
