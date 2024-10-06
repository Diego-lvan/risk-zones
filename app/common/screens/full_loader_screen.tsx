import { View, StyleSheet, ActivityIndicator } from "react-native";
import { APP_THEME } from "../theme/theme";

export const FullLoaderScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={APP_THEME.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: APP_THEME.colors.background,
  },
});
