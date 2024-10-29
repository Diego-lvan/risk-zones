import { Callout, Marker } from "react-native-maps";
import { RiskPoint } from "../../domain/entities/risk_point_entity";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { APP_THEME } from "@/common/theme/theme";

interface RiskPointMarkerProps {
  point: RiskPoint;
}

export const RiskPointMarker = ({ point }: RiskPointMarkerProps) => {
  const onPress = () => {
    router.push(`/see_new_details/${point.id}`);
  };
  return (
    <Marker
      coordinate={{
        latitude: point.coords.latitude,
        longitude: point.coords.longitude,
      }}
      anchor={{ x: 0.5, y: 0.1 }}
      style={{ opacity: 0 }}
    >
      <Callout onPress={onPress}>
        <View style={styles.marker}>
          <Text numberOfLines={2} style={styles.markerText}>
            {point.title}
          </Text>
          <View style={styles.newDetailsButton}>
            <Text style={styles.newDetailsButtonText}>Ver detalles</Text>
          </View>
        </View>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  marker: {
    height: 130,
    width: 150,
    borderRadius: 10,
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  markerText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  newDetailsButton: {
    height: 30,
    width: 100,
    backgroundColor: APP_THEME.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  newDetailsButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
