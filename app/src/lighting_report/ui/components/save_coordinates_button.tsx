import { APP_THEME } from "@/common/theme/theme";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

interface SaveCoordinatesButtonProps {
  onPress: () => void;
}

export const SaveCoordinatesButton = ({
  onPress,
}: SaveCoordinatesButtonProps) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>Confirmar</Text>
      </TouchableOpacity>
    </View>
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
  buttonContainer: {
    padding: 20,
    alignItems: "center",
  },
});
