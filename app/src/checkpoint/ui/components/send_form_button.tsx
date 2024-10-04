import { APP_THEME } from "@/common/theme/theme";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

interface SendFormButtonProps {
  handleOnPress: () => void;
}

export const SendFormButton = ({ handleOnPress }: SendFormButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={handleOnPress}>
      <Text style={styles.text}>Aceptar</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    elevation: 5,
    width: "60%", // Un poco más pequeño que el ancho total para dejar márgenes
    borderRadius: 8,
    marginBottom: 25,
    marginRight: 30,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: APP_THEME.colors.primary,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
