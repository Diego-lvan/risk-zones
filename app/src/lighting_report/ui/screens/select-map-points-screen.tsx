import { View, Text, StyleSheet, Alert } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { APP_THEME } from "@/common/theme/theme";
import { useSaveLightingReport } from "../../hooks/useSaveLigthingReport";
import { CustomButton } from "../components/save_coordinates_button";
import { darkMapStyle } from "@/src/lighted_streets/ui/screens/dark_style";
import { LightedStreet } from "@/src/lighted_streets/ui/components/lighted_street_component";
import { FullLoaderScreen } from "@/common/screens/full_loader_screen";

export const SelectMapPointsScreen = () => {
  const {
    updateValue,
    onSubmit,
    errors,
    mutation,
    handleMapPress,
    handleMarkerPress,
    tempEndCoords,
    tempStartCoords,
    lightedStreetsPoints,
    handleSubmit,
    previewRoute,
    getRoute,
    actualRegion,
  } = useSaveLightingReport();

  if (mutation.isPending) {
    return <FullLoaderScreen />;
  }

  return (
    <View style={styles.mainContainer}>
      <MapView
        style={styles.map}
        onPress={handleMapPress}
        initialRegion={actualRegion}
        customMapStyle={darkMapStyle}
      >
        {tempStartCoords && (
          <Marker
            coordinate={tempStartCoords}
            //image={require("@/assets/images/icon_marker.png")}
            onPress={() => handleMarkerPress("start")}
          >
            <Callout>
              <Text>Inicio</Text>
            </Callout>
          </Marker>
        )}
        {tempEndCoords && (
          <Marker
            coordinate={tempEndCoords}
            pinColor="black"
            // image={require("@/assets/images/icon_marker.png")}
            onPress={() => handleMarkerPress("end")}
          >
            <Callout>
              <Text>Fin</Text>
            </Callout>
          </Marker>
        )}

        {lightedStreetsPoints.map((point, index) => (
          <LightedStreet key={index} coordinates={point.points} />
        ))}

        {previewRoute && (
          <LightedStreet key="prevRoute" coordinates={previewRoute.points} />
        )}
      </MapView>
      <Text style={styles.selectLocationText}>
        Selecciona dos puntos en el mapa
      </Text>
      <CustomButton
        text="Visualizar"
        onPress={getRoute}
        disable={!!previewRoute}
      />
      <CustomButton
        text="Guardar"
        onPress={handleSubmit}
        disable={!previewRoute}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: APP_THEME.colors.background,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 15,
    textAlign: "center",
    color: "black",
  },
  map: {
    flex: 4,
    borderWidth: 2,
    borderColor: APP_THEME.colors.primary,
    elevation: 5,
  },
  selectLocationText: {
    textAlign: "center",
    paddingVertical: 10,
    color: "black",
    fontSize: 16,
  },
  markerLabel: {
    position: "absolute",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },
  labelText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
