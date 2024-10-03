import { ScrollView, View, StyleSheet } from "react-native";
import { CustomTextInput } from "../components/custom_text_input";
import { MapInput } from "../components/map_input";
import { SaveCheckpointButton } from "../components/save_checkpoint_button";
import { APP_THEME } from "@/common/theme/theme";

export const AddCheckpointScreen = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.mainContainer}
      style={styles.innerContainer}
    >
      <CustomTextInput label="Nombre" />
      <MapInput label="Selecciona la ubicación del checkpoint" />
      <View style={{ height: 20 }} />
      <SaveCheckpointButton />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    gap: 15,
    paddingHorizontal: 30,
    paddingVertical: 20,
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    backgroundColor: APP_THEME.colors.background,
  },
});
