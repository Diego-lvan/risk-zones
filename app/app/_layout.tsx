import { APP_THEME } from "@/common/theme/theme";
import { SelectLocationProvider } from "@/src/common/context/location_context";
import { AntDesign } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SelectLocationProvider>
        <RootLayoutNav />
      </SelectLocationProvider>
    </QueryClientProvider>
  );
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="add_checkpoint"
        options={{
          title: "Guardar Checkpoint",
          headerLeft: (props) => {
            const { tintColor, canGoBack } = props;
            return (
              <AntDesign
                name="left"
                size={24}
                color={tintColor ?? APP_THEME.colors.primary}
                onPress={canGoBack ? () => router.back() : undefined}
                style={{ marginRight: 10 }}
              />
            );
          },
        }}
      />
      <Stack.Screen name="select_map_location"></Stack.Screen>
    </Stack>
  );
}
