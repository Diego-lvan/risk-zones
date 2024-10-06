import { APP_THEME } from "@/common/theme/theme";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

interface BackArrowButtonProps {
  canGoBack: boolean;
  tintColor?: string;
}

export const BackArrowButton = ({
  tintColor,
  canGoBack,
}: BackArrowButtonProps) => {
  return (
    <AntDesign
      name="left"
      size={24}
      color={tintColor ?? APP_THEME.colors.primary}
      onPress={canGoBack ? () => router.back() : undefined}
      style={{ marginRight: 10 }}
    />
  );
};
