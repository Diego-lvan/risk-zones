import { CoordEntity } from "@/src/risk_zones_map/domain/entities/coordinate_entity";
import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import MapView, { Callout, MapPressEvent, Marker } from "react-native-maps";
import { useSelectLocationTwoPoints } from "@/src/common/context/location_two_points_context";
import { APP_THEME } from "@/common/theme/theme";
import { useUserLocation } from "@/src/common/hooks/useUserLocation";
import { useSaveLightingReport } from "../../hooks/useSaveLigthingReport";
import { SaveCoordinatesButton } from "../components/save_coordinates_button";

export const SelectMapPointsScreen = () => {
  const { updateValue, onSubmit, errors, mutation } = useSaveLightingReport();
  const { startCoords, endCoords, setLocation } = useSelectLocationTwoPoints();
  const [tempStartCoords, setTempStartCoords] = useState<CoordEntity | null>(
    null
  );
  const [tempEndCoords, setTempEndCoords] = useState<CoordEntity | null>(null);
  const { getUserLocation } = useUserLocation();
  const isLocationSet = useRef(false);

  const handleMapPress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    if (!tempStartCoords) {
      setTempStartCoords({ latitude, longitude });
    } else if (!tempEndCoords) {
      setTempEndCoords({ latitude, longitude });
      isLocationSet.current = true;
    } else {
      Alert.alert(
        "Ya has seleccionado dos puntos. Toca un punto para cambiarlo."
      );
    }
  };

  const handleMarkerPress = (type: "start" | "end") => {
    if (type === "start") {
      setTempStartCoords(null);
    } else if (type === "end") {
      setTempEndCoords(null);
    }
  };

  const handleSave = () => {
    if (!tempStartCoords || !tempEndCoords) {
      Alert.alert("Error", "Selecciona dos puntos en el mapa");
      return;
    }

    setLocation(tempStartCoords, tempEndCoords);
    console.log("Coordenadas guardadas en contexto:", {
      tempStartCoords,
      tempEndCoords,
    });
    return true;
  };

  const handleSubmit = async () => {
    console.log("Iniciando proceso de guardado...");

    if (!tempStartCoords || !tempEndCoords) {
      Alert.alert("Error", "Selecciona dos puntos en el mapa");
      return;
    }

    try {
      // Primero guardamos en el contexto
      setLocation(tempStartCoords, tempEndCoords);

      console.log("Datos antes de enviar al backend:", {
        startCoords: tempStartCoords,
        endCoords: tempEndCoords,
      });

      const result = await onSubmit();

      console.log("Resultado de onSubmit:", result);

      // Verificamos el estado de la mutación
      if (mutation.isSuccess) {
        console.log("Respuesta del backend:", mutation.data);
        Alert.alert("Éxito", "Los datos se guardaron correctamente");
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      Alert.alert("Error", "No se pudieron guardar los datos");
    }
  };

  useEffect(() => {
    getUserLocation((coords) => {
      setTempStartCoords(coords);
    });
  }, []);

  useEffect(() => {
    // Log para debugging
    console.log("Coordenadas actuales:", { startCoords, endCoords });
  }, [startCoords, endCoords]);

  return (
    <View style={styles.mainContainer}>
      <MapView
        style={styles.map}
        onPress={handleMapPress}
        initialRegion={{
          latitude: tempStartCoords?.latitude || 22.7709,
          longitude: tempStartCoords?.longitude || -102.5832,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
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
      </MapView>
      <Text style={styles.selectLocationText}>
        Selecciona dos puntos en el mapa
      </Text>
      <SaveCoordinatesButton onPress={handleSubmit} />
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
