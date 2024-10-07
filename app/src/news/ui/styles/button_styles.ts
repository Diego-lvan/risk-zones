import { APP_THEME } from "@/common/theme/theme";
import { StyleSheet } from "react-native";

export const buttonStyles = StyleSheet.create({
  button: {
    padding: 10,
    elevation: 5,
    width: "100%",
    borderRadius: 8,
    height: 50,
    justifyContent: "space-around",
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
