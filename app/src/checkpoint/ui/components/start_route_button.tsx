import { APP_THEME } from "@/common/theme/theme";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

interface StartRouteButtonProps {
  handleOnPress: () => void;
  isActiveRoute: boolean;
}

export const StartRouteButton = ({ handleOnPress, isActiveRoute }: StartRouteButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={handleOnPress}>
      <Text style={styles.text}>{isActiveRoute ? "Finalizar recorrido" : "Iniciar recorrido"}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    elevation: 5,
    width: "50%", // Un poco más pequeño que el ancho total para dejar márgenes
    borderRadius: 8,
    height: 40,
    position: "absolute",
    bottom: 23,
    backgroundColor: APP_THEME.colors.primary,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
