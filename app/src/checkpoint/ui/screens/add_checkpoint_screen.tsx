import { ScrollView, View, StyleSheet } from "react-native";
import { CustomTextInput } from "../components/custom_text_input";
import { MapInput } from "../components/map_input";
import { CustomEndButton } from "../components/custom_end_button";
import { APP_THEME } from "@/common/theme/theme";
import {
  useSaveCheckpoint,
  useValidatedForm,
} from "../../hooks/useSaveCheckpoint";
import { useEffect } from "react";
import { useSelectLocation } from "@/src/common/context/location_context";
import { FullLoaderScreen } from "@/common/screens/full_loader_screen";

export const AddCheckpointScreen = () => {
  const { updateValue, onSubmit, errors, mutation } = useSaveCheckpoint();
  const { resetLocation } = useSelectLocation();

  useEffect(() => {
    return () => {
      resetLocation();
    };
  }, []);

  if (mutation.isPending) {
    return <FullLoaderScreen />;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.mainContainer}
      style={styles.innerContainer}
    >
      <CustomTextInput
        label="Nombre"
        textInputProps={{
          onChangeText: (text) => updateValue("name", text),
          placeholder: "Nombre del checkpoint",
        }}
        error={errors.name?.message}
      />
      <MapInput
        label="Selecciona la ubicación del checkpoint"
        error={errors.latitude?.message}
      />
      <View style={{ height: 20 }} />
      <CustomEndButton onPress={onSubmit} message="Guardar checkpoint" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    gap: 30,
    paddingHorizontal: 30,
    paddingVertical: 20,
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    backgroundColor: APP_THEME.colors.background,
  },
});
