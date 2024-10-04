import { CoordEntity } from "@/src/risk_zones_map/domain/entities/coordinate_entity";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import { useSelectLocation } from "../../context/location_context";
import { useUserLocation } from "../../hooks/useUserLocation";
import { APP_THEME } from "@/common/theme/theme";

export const SelectMapLocationScreen = () => {
  const [currentLocation, setCurrentLocation] = useState<CoordEntity | null>(
    null
  );
  const { getUserLocation } = useUserLocation();
  const { setLocation } = useSelectLocation();
  const isLocationSet = useRef(false);

  const handleMapPress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    isLocationSet.current = true;
    setCurrentLocation({ latitude, longitude });
  };

  const handleSave = () => {
    if (isLocationSet.current && currentLocation) {
      setLocation(currentLocation);
    }
    router.back();
  };

  useEffect(() => {
    getUserLocation((coords) => {
      setCurrentLocation(coords);
    });
  }, []);

  if (!currentLocation) {
    return <View />;
  }

  return (
    <View style={styles.mainContainer}>
      <MapView
        onPress={handleMapPress}
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
      >
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
          />
        )}
      </MapView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.text}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  map: {
    flex: 2,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 10,
    elevation: 5,
    width: "80%",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: APP_THEME.colors.primary,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
