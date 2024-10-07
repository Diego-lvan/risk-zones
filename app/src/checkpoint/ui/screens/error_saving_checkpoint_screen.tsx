import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { CustomEndButton } from "../components/custom_end_button";
import { APP_THEME } from "@/common/theme/theme";

interface SaveCheckpointScreenProps {
  isKnownError: boolean;
  errorMessage: string;
}

export const SaveCheckpointErrorScreen = ({
  isKnownError,
  errorMessage,
}: SaveCheckpointScreenProps) => {
  const handleOnPress = () => {
    if (isKnownError) {
      router.back();
    } else {
      router.dismissAll();
    }
  };

  const message = isKnownError ? "Volver a intentar" : "Intentar más tarde";

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }} />
      <AntDesign name="closecircleo" size={180} color="red" />
      <Text style={styles.title}>{errorMessage}</Text>
      <View style={{ flex: 2 }} />
      <CustomEndButton onPress={handleOnPress} message={message} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: APP_THEME.colors.background,
    padding: 25,
    gap: 25,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
  },
});
