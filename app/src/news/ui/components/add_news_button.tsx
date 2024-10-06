import { APP_THEME } from "@/common/theme/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity, StyleSheet } from "react-native";

export const AddNewsButton = () => {
  const handlePress = () => {
    router.push("/add_news");
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <FontAwesome name="plus" size={24} color={APP_THEME.colors.secondary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: APP_THEME.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
