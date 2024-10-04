import { View, StyleSheet, Text, Button, TextInput } from "react-native";
import { ButtonSelectLocation } from "../components/button_select_location";
import { CustomTextInput } from "../components/custom_text_input";

const UploadNewsScreen = () => {
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
