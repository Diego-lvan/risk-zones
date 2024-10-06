import { APP_THEME } from "@/common/theme/theme";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

interface CustomEndButtonProps {
  onPress: () => void;
  message: string;
}

export const CustomEndButton = ({ onPress, message }: CustomEndButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{message}</Text>
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
