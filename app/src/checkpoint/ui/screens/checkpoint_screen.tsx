import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { AddCheckpointButton } from "../components/add_checkpoint_button";
import { StartRouteButton } from "../components/start_route_button";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ContactFormModal } from "../components/contact_form_modal";
import { useSendNotification } from "../../hooks/useSendNotification";
import { useLoadCheckpoints } from "../../hooks/useLoadCheckpoints";
import { APP_THEME } from "@/common/theme/theme";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Dimensions } from "react-native";
import { AddButton } from "@/common/components/add_button";
import { useFocusEffect } from "expo-router";
import { useDeleteCheckpoint } from "../../hooks/useDeleteCheckpoint";

export const CheckpointScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isActiveRoute, setIsActiveRoute] = useState(false);
  const isRefetchNeeded = useRef(true);

  const toggleShowModal = () => {
    setIsModalVisible(!isModalVisible);
    console.log("toggleShowModal");
  };

  const { initialRegion, isLoading, checkpoints, refreshMap, setCheckpoints } = useLoadCheckpoints();
  const { handlePressStartRoute, handleContactPhoneChange, stopTrackingLocation } = useSendNotification(
    setIsModalVisible,
    setIsActiveRoute,
    isActiveRoute,
    setCheckpoints,
    checkpoints
  );
  const { deleteCheckpoint } = useDeleteCheckpoint({ refreshMap });

  console.info("Render");

  useFocusEffect(() => {
    console.log("useFocusEffect");
    if (isRefetchNeeded.current) {
      refreshMap();
      isRefetchNeeded.current = false;
    }
  });

  const handleShowModal = () => {
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
              anchor={{ x: 0.5, y: 1 }}
            >
              <Callout onPress={() => deleteCheckpoint(point.id)}>
                <View style={styles.marker}>
                  <Text numberOfLines={2} style={styles.markerText}>
                    {point.name}
                  </Text>
                  <View style={styles.deleteDetailsButton}>
                    <Text style={styles.deleteBtn}>Eliminar</Text>
                  </View>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
        {isLoading && <ActivityIndicator style={mapStyles.loading} size="large" color="#0000ff" />}
      </View>

      <StartRouteButton handleOnPress={handleShowModal} isActiveRoute={isActiveRoute} />
      <AddCheckpointButton
        onPressCallback={() => {
          isRefetchNeeded.current = true;
          console.log("isRefetchNeeded.current", isRefetchNeeded.current);
        }}
      />

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

  deleteBtn: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  deleteDetailsButton: {
    height: 30,
    width: 100,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  markerText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  marker: {
    height: 130,
    width: 150,
    borderRadius: 10,
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "red",
    borderRadius: 5,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});
