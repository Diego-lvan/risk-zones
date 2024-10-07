import { View, StyleSheet } from "react-native";
import { AddCheckpointButton } from "../components/add_checkpoint_button";
import { StartRouteButton } from "../components/start_route_button";
import { useState } from "react";
import { ContactFormModal } from "../components/contact_form_modal";
import { useFormNotification } from "../../hooks/useSendNotification";

export const CheckpointScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isActiveRoute, setIsActiveRoute] = useState(false);

  const { handlePressStartRoute, handleContactPhoneChange, stopTrackingLocation } = useFormNotification(
    setIsModalVisible,
    setIsActiveRoute,
    isActiveRoute
  );
  const toggleShowModal = () => {
    setIsModalVisible(!isModalVisible);
    console.log("toggleShowModal");
  };

  const handleShowModal = () => {
    // logic when the route is started
    if (!isActiveRoute) {
      setIsModalVisible(true);
      return;
    }
    stopTrackingLocation();
    setIsActiveRoute(false);
  };

  return (
    <View style={styles.mainContainer}>
      <StartRouteButton handleOnPress={handleShowModal} isActiveRoute={isActiveRoute} />
      <AddCheckpointButton />

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
