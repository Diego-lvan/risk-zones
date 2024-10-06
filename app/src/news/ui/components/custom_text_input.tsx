import { APP_THEME } from "@/common/theme/theme";
import { template } from "@babel/core";
import {
  Text,
  TextInput,
  TextInputProps,
  View,
  StyleSheet,
  TextStyle,
  StyleProp,
} from "react-native";
interface CustomTextInputProps {
  label?: string;
  textInputProps?: TextInputProps;
  inputstyle?: StyleProp<TextStyle>;
}
export const CustomTextInput = ({
  label,
  textInputProps,
  inputstyle,
}: CustomTextInputProps) => {
  return (
    <View style={[styles.mainContainer]}>
      {label && <Text style={[styles.label]}>{label}</Text>}
      <TextInput
        {...textInputProps}
        style={[inputstyle, styles.textInput]}
        selectionColor={"black"}
      />
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
    backgroundColor: "white",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});
