import { View, StyleSheet, Text, Button, TextInput } from "react-native";
import { ButtonSelectLocation } from "../components/button_select_location";
import { CustomTextInput } from "../components/custom_text_input";
import { SaveNewsButton } from "../components/save_news_button";
import { useValidatedForm } from "../../hooks/useNews";
import { useSelectLocation } from "@/src/common/context/location_context";
import { useEffect } from "react";

const UploadNewsScreen = () => {
  const { updateValue, onSubmit, errors } = useValidatedForm();
  const { resetLocation } = useSelectLocation();

  useEffect(() => {
    return () => {
      resetLocation();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <CustomTextInput
        textInputProps={{
          placeholder: "Ingresa el título de la noticia",
        }}
        inputstyle={{ height: 50, width: "100%" }}
      />
      <Text style={styles.label}>Contenido</Text>
      <CustomTextInput
        textInputProps={{
          placeholder: "Descripción",
          multiline: true,
        }}
        inputstyle={{ height: 100, width: "100%" }}
      />
      <ButtonSelectLocation />
      <SaveNewsButton
        onPress={() => {
          onSubmit;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 50,
  },
  textArea: {
    height: 100,
  },
});

export default UploadNewsScreen;
