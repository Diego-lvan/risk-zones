import { View, Text, Button } from "react-native";
import { useRiskAreas } from "../../hooks/useRiskAreas";
import MapView, {
  Callout,
  Heatmap,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import { APP_THEME } from "@/common/theme/theme";
import { AddButton } from "@/common/components/add_button";
import { RiskPointMarker } from "../components/risk_point_marker";

export const RiskAreasScreen = () => {
  const {
    initialRegion,
    isLoading,
    onChangeRadius,
    radius,
    points,
    riskPoints,
    onPressAddNewsButton,
    handlePressNewsDetails,
  } = useRiskAreas();

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
      >
        {points.length > 0 && (
          <Heatmap points={points} opacity={0.7} radius={20} />
        )}

        {riskPoints.map((point, index) => (
          <RiskPointMarker key={index} point={point} />
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
      <AddButton onPress={onPressAddNewsButton} styles={styles.button} />
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
