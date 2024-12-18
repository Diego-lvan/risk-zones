import { APP_THEME } from "@/common/theme/theme";
import { SelectLocationProvider } from "@/src/common/context/location_context";
import { BackArrowButton } from "@/src/common/ui/components/back_arrow_button";
import { UserProvider, useUser } from "@/src/user/context/user_context";
import { AntDesign } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "react-native-reanimated";
import { SelectLocationTwoPointsProvider } from "@/src/common/context//location_two_points_context";
import { LightedStreetsProvider } from "@/src/lighted_streets/context/lightes_streets_context";

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
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <SelectLocationProvider>
          <SelectLocationTwoPointsProvider>
            <LightedStreetsProvider>
              <RootLayoutNav />
            </LightedStreetsProvider>
          </SelectLocationTwoPointsProvider>
        </SelectLocationProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

function RootLayoutNav() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const { isLoading: isLoadingUser } = useUser();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && !isLoadingUser) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isLoadingUser]);

  if (!loaded || isLoadingUser) {
    return null;
  }
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
              <BackArrowButton tintColor={tintColor} canGoBack={canGoBack} />
            );
          },
        }}
      />
      <Stack.Screen
        name="select_map_location"
        options={{
          title: "Selecciona la ubicación",
          headerLeft: (props) => {
            const { tintColor, canGoBack } = props;
            return (
              <BackArrowButton tintColor={tintColor} canGoBack={canGoBack} />
            );
          },
        }}
      />
      <Stack.Screen
        name="checkpoint_saved"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="save_checkpoint_error"
        options={{
          title: "",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="add_news"
        options={{ title: "Subir noticia" }}
      ></Stack.Screen>
      <Stack.Screen
        name="news_saved"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="see_new_details/[id]"
        options={{
          title: "Detalles de la noticia",
          headerLeft: (props) => {
            const { tintColor, canGoBack } = props;
            return (
              <BackArrowButton tintColor={tintColor} canGoBack={canGoBack} />
            );
          },
        }}
      />
      <Stack.Screen
        name="rate_street/[id]"
        options={{
          title: "Calificar iluminación",
          headerLeft: (props) => {
            const { tintColor, canGoBack } = props;
            return (
              <BackArrowButton tintColor={tintColor} canGoBack={canGoBack} />
            );
          },
        }}
      />
      <Stack.Screen
        name="lighting_report_saved"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="select_map_points_location"
        options={{
          title: "Subir reporte de iluminación",
          headerLeft: (props) => {
            const { tintColor, canGoBack } = props;
            return (
              <BackArrowButton tintColor={tintColor} canGoBack={canGoBack} />
            );
          },
        }}
      />
    </Stack>
  );
}
