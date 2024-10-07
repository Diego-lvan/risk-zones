import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { APP_THEME } from "@/common/theme/theme";

interface SaveNewsButtonProps {
  onPress: () => void;
}

export const SaveNewsButton = ({ onPress }: SaveNewsButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Guardar Noticia</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    elevation: 5,
    width: "100%",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: APP_THEME.colors.primary,
    marginTop: 20,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
