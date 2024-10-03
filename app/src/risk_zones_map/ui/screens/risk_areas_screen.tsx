import { View, Text } from "react-native";
import { useRiskAreas } from "../../hooks/useRiskAreas";
import MapView, { Circle, Heatmap, PROVIDER_GOOGLE } from "react-native-maps";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";

export const RiskAreasScreen = () => {
  const { initialRegion, isLoading, onChangeRadius, radius, points } =
    useRiskAreas();

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
        initialRegion={initialRegion}
        mapType="standard"
        showsUserLocation
        showsMyLocationButton
        onRegionChangeComplete={(region) => {
          onChangeRadius(region);
        }}
      >
        <Heatmap points={points} opacity={0.7} radius={20} />
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
    bottom: 20,
    right: 20,
    color: "white",
    fontSize: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 5,
  },
});
