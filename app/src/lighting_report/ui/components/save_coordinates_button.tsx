import { APP_THEME } from "@/common/theme/theme";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

interface CustomButtonProps {
  text: string;
  disable?: boolean;
  onPress: () => void;
}

export const CustomButton = ({ text, disable, onPress }: CustomButtonProps) => {
  const styles = StyleSheet.create({
    button: {
      padding: 10,
      elevation: 5,
      width: "80%",
      borderRadius: 10,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: !!disable ? "gray" : APP_THEME.colors.primary,
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

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        disabled={!!disable}
      >
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};
