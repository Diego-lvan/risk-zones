import { View, Text } from "react-native";
import { useRiskAreas } from "../../hooks/useRiskAreas";
import MapView, { Heatmap } from "react-native-maps";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import { APP_THEME } from "@/common/theme/theme";
import { AddButton } from "@/common/components/add_button";
import { router } from "expo-router";

export const RiskAreasScreen = () => {
  const { initialRegion, isLoading, onChangeRadius, radius, points } =
    useRiskAreas();

  const onPressAddNewsButton = () => {
    router.push("/add_news");
  };

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
      >
        {points.length > 0 && (
          <Heatmap points={points} opacity={0.7} radius={20} />
        )}
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
