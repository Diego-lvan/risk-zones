import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import { useLightedStreets } from "../../hooks/useLightedStreets";
import { APP_THEME } from "@/common/theme/theme";
import MapView, { Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { darkMapStyle } from "./dark_style";
import { Fragment } from "react";

export const LightedStreetsScreen = () => {
  const {
    initialRegion,
    onChangeRadius,
    isLoading,
    radius,
    lightedStreetsPoints,
  } = useLightedStreets();

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
          <Fragment key={index}>
            <Polyline
              coordinates={point.points}
              strokeColor="rgba(255, 255, 0, 0.2)" // Color amarillo con baja opacidad para el resplandor exterior
              strokeWidth={8} // Ancho mayor para el resplandor exterior
            />
            <Polyline
              coordinates={point.points}
              strokeColor="rgba(255, 255, 0, 0.5)" // Color amarillo con media opacidad para el resplandor intermedio
              strokeWidth={6} // Ancho intermedio para el resplandor intermedio
            />
            <Polyline
              coordinates={point.points}
              strokeColor="yellow" // Color amarillo sólido para la línea principal
              strokeWidth={2} // Ancho menor para la línea principal
            />
          </Fragment>
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
    backgroundColor: APP_THEME.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
