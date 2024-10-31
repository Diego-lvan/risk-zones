import { View, StyleSheet, ActivityIndicator } from "react-native";
import { AddCheckpointButton } from "../components/add_checkpoint_button";
import { StartRouteButton } from "../components/start_route_button";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ContactFormModal } from "../components/contact_form_modal";
import { useFormNotification } from "../../hooks/useSendNotification";
import { useLoadCheckpoints } from "../../hooks/useLoadCheckpoints";
import { APP_THEME } from "@/common/theme/theme";

import { Text, Button } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Dimensions } from "react-native";
import { AddButton } from "@/common/components/add_button";
import { useFocusEffect } from "expo-router";

export const CheckpointScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isActiveRoute, setIsActiveRoute] = useState(false);
  // Ref para saber si se necesita obtener nuevamente los checkpoints
  const isRefetchNeeded = useRef(true);

  const {
    handlePressStartRoute,
    handleContactPhoneChange,
    stopTrackingLocation,
  } = useFormNotification(setIsModalVisible, setIsActiveRoute, isActiveRoute);
  const toggleShowModal = () => {
    setIsModalVisible(!isModalVisible);
    console.log("toggleShowModal");
  };

  const { initialRegion, isLoading, checkpoints, refreshMap } =
    useLoadCheckpoints();

  console.info("Render");

  // Se ejecuta cada vez que se renderiza el componente
  useFocusEffect(() => {
    console.log("useFocusEffect");
    if (isRefetchNeeded.current) {
      refreshMap();
      isRefetchNeeded.current = false;
    }
  });

  const handleShowModal = () => {
    // lógica cuando la ruta está iniciada
    if (!isActiveRoute) {
      setIsModalVisible(true);
      return;
    }
    stopTrackingLocation();
    setIsActiveRoute(false);
  };

  if (!initialRegion) {
    return (
      <View style={mapStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={mapStyles.container}>
        <MapView
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
          initialRegion={initialRegion}
          mapType="standard"
          showsUserLocation
          showsMyLocationButton={true}
          rotateEnabled={false}
          provider={PROVIDER_GOOGLE}
        >
          {checkpoints.map((point, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: point.coords.latitude,
                longitude: point.coords.longitude,
              }}
              anchor={{ x: 0.5, y: 1 }} // Ajusta el ancla para que la punta del marcador coincida con la ubicación
            >
              <Callout>
                <View>
                  <Text>{point.name}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
        {isLoading && (
          <ActivityIndicator
            style={mapStyles.loading}
            size="large"
            color="#0000ff"
          />
        )}
      </View>

      <StartRouteButton
        handleOnPress={handleShowModal}
        isActiveRoute={isActiveRoute}
      />
      <AddCheckpointButton
        onPressCallback={() => {
          isRefetchNeeded.current = true;
          console.log("isRefetchNeeded.current", isRefetchNeeded.current);
        }}
      />

      {/* Mostrar el modal dependiendo de la visibilidad */}
      <ContactFormModal
        toggleShowModal={toggleShowModal}
        handleContactPhoneChange={handleContactPhoneChange}
        handlePressStartRoute={handlePressStartRoute}
        showModal={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setIsActiveRoute={setIsActiveRoute}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

const mapStyles = StyleSheet.create({
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
