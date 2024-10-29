import { Alert } from "react-native";

export const showErrorMessage = (
  message: string,
  funcionOnPress?: () => void
) => {
  Alert.alert(
    "Error",
    message,
    [
      ...(funcionOnPress
        ? [
            {
              text: "Volver a intentar",
              onPress: () => funcionOnPress(),
            },
          ]
        : []),
      {
        text: "Cerrar",
        style: "cancel",
      },
    ],
    { cancelable: false }
  );
};
