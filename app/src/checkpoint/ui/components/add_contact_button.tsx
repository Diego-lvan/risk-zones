import { APP_THEME } from "@/common/theme/theme";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";

interface AddContactButtonProps {
  onPressCallback?: () => void;
}

export const AddContactButton = ({
  onPressCallback,
}: AddContactButtonProps) => {
  const handlePress = () => {
    if (onPressCallback) {
      onPressCallback();
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <AntDesign name="adduser" size={24} color={APP_THEME.colors.secondary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 80,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: APP_THEME.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
