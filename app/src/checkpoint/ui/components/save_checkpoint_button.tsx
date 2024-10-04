import { APP_THEME } from "@/common/theme/theme";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export const SaveCheckpointButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>Guardar Checkpoint</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    elevation: 5,
    width: "80%",
    borderRadius: 10,
    height: 50,
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
