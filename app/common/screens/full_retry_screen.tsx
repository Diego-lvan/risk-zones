import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { APP_THEME } from "../theme/theme";

interface FullRetryScreenProps {
  retryCallback: () => void;
  message?: string;
}

export const FullRetryScreen = ({
  message,
  retryCallback,
}: FullRetryScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.anErrorOccurredText}>
        {message || "Ha ocurrido un error"}
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={retryCallback}>
        <MaterialCommunityIcons
          name="reload"
          size={24}
          color={APP_THEME.colors.secondary}
        />
        <Text style={styles.retryText}>Reintentar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    backgroundColor: APP_THEME.colors.background,
  },
  anErrorOccurredText: {
    fontSize: 20,
    fontWeight: "semibold",
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    gap: 8,
    backgroundColor: APP_THEME.colors.primary,
    borderRadius: 8,
  },
  retryText: {
    fontSize: 16,
    fontWeight: "bold",
    color: APP_THEME.colors.secondary,
  },
});
