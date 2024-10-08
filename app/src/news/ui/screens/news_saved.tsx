import { AntDesign } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { CustomEndButton } from "../../../checkpoint/ui/components/custom_end_button";
import { router } from "expo-router";
import { APP_THEME } from "@/common/theme/theme";

export const NewsSavedScreen = () => {
  const handlePress = () => {
    router.dismissAll();
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }} />
      <AntDesign name="checkcircleo" size={180} color="green" />
      <Text style={styles.title}>Noticia subida con éxito</Text>
      <View style={{ flex: 1 }} />
      <CustomEndButton onPress={handlePress} message="Terminar" />
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
