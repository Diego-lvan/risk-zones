import { APP_THEME } from "@/common/theme/theme";
import { useSelectLocation } from "@/src/common/context/location_context";
import { router, Href } from "expo-router";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface MapInputProps {
  label?: string;
  coordinates?: { latitude: number; longitude: number };
  handleChangedCoordinates?: (coordinates: {
    latitude: number;
    longitude: number;
  }) => void;
  error?: string;
}

export const MapInput = ({ label, error }: MapInputProps) => {
  const { location: coordinates } = useSelectLocation();
  const handlePress = () => {
    router.push("./select_map_location");
  };
  return (
    <View style={styles.mainContainer}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity style={styles.map} onPress={handlePress}>
        <MapView
          style={{ flex: 1 }}
          scrollEnabled={false}
          region={{
            latitude: coordinates?.latitude || 0,
            longitude: coordinates?.longitude || 0,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          {coordinates && (
            <Marker
              coordinate={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
              }}
            />
          )}
        </MapView>
      </TouchableOpacity>
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    aspectRatio: 4 / 5,
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: APP_THEME.colors.text,
  },
  map: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
  },
});
