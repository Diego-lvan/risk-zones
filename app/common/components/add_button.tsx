import { APP_THEME } from "@/common/theme/theme";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, StyleProp, ViewStyle } from "react-native";

interface AddButtonProps {
  onPress: () => void;
  styles: StyleProp<ViewStyle>;
}

export const AddButton = ({ onPress, styles }: AddButtonProps) => {
  return (
    <TouchableOpacity style={styles} onPress={onPress}>
      <FontAwesome name="plus" size={24} color={APP_THEME.colors.secondary} />
    </TouchableOpacity>
  );
};
