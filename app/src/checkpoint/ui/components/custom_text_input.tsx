import { APP_THEME } from "@/common/theme/theme";
import {
  Text,
  TextInput,
  TextInputProps,
  View,
  StyleSheet,
} from "react-native";

interface CustomTextInputProps {
  label?: string;
  textInputProps?: TextInputProps;
  error?: string;
}

export const CustomTextInput = ({
  label,
  textInputProps,
  error,
}: CustomTextInputProps) => {
  return (
    <View style={styles.mainContainer}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        {...textInputProps}
        style={styles.textInput}
        selectionColor={"black"}
      />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: 100,
    paddingVertical: 10,
    gap: 10,
  },
  label: {
    fontSize: 15,
    color: APP_THEME.colors.text,
    fontWeight: "bold",
  },
  textInput: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});
