import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import { useLightedStreets } from "../../hooks/useLightedStreets";
import { APP_THEME } from "@/common/theme/theme";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { darkMapStyle } from "./dark_style";
import { AddButton } from "@/common/components/add_button";
import { LightedStreet } from "../components/lighted_street_component";
import { router } from "expo-router";
import { useUser } from "@/src/user/context/user_context";
import { showErrorMessage } from "@/src/common/errors/error_message";
import * as SecureStorage from "expo-secure-store";

export const LightedStreetsScreen = () => {
  const {
    initialRegion,
    onChangeRadius,
    isLoading,
    radius,
    lightedStreetsPoints,
    onPressAddLightedStreetsButton,
  } = useLightedStreets();
  const { user } = useUser();

  const onPressRateButton = (streetId: string) => {
    if (!user) {
      showErrorMessage("Usuario no encontrado");
      return;
    }
    const checkRating = async () => {
      const isRated = await checkUserRating(streetId, user.id);
      if (isRated) {
        showErrorMessage("Ya has calificado esta calle");
        return;
      }
      router.push(`/rate_street/${streetId}`);
    };
    checkRating();
  };

  const checkUserRating = async (
    streetId: string,
    userId: string
  ): Promise<boolean> => {
    const userRating = await SecureStorage.getItemAsync(streetId);
    if (userRating) {
      const isRated = userRating.includes(userId);
      return isRated ? true : false;
    }
    return false;
  };

  if (!initialRegion) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
        initialRegion={initialRegion}
        mapType="standard"
        showsUserLocation
        showsMyLocationButton={true}
        onRegionChangeComplete={(region) => {
          onChangeRadius(region);
        }}
        rotateEnabled={false}
        provider={PROVIDER_GOOGLE}
        customMapStyle={darkMapStyle}
      >
        {lightedStreetsPoints.map((point, index) => (
          <LightedStreet
            key={index}
            coordinates={point.points}
            rating={point.rating || 2}
            onPress={() => onPressRateButton(point.streetId || "")}
          />
        ))}
      </MapView>

      {isLoading && (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color="#0000ff"
        />
      )}
      <Text style={styles.radiusText}>
        Radio:{" "}
        {radius > 999
          ? `${(radius / 1000).toFixed(1)} km`
          : `${radius.toFixed(0)} m`}
      </Text>
      <AddButton
        onPress={onPressAddLightedStreetsButton}
        styles={styles.button}
        white={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  radiusText: {
    position: "absolute",
    bottom: 50 + 20 + 10,
    right: 20,
    color: "white",
    fontSize: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: APP_THEME.colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
});
