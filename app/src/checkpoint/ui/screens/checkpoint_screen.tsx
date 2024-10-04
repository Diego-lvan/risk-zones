import { View, StyleSheet } from "react-native";
import { AddCheckpointButton } from "../components/add_checkpoint_button";
import { StartRouteButton } from "../components/start_route_button";
import { useState } from "react";
import { ContactFormModal } from "../components/contact_form_modal";

export const CheckpointScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isActiveRoute, setIsActiveRoute] = useState(false);

  const handlePressStartRoute = () => {
    // logic when the route is started
    if (!isActiveRoute) {
      setIsModalVisible(true);
      return;
    }
    // logic when the route is finished
    setIsActiveRoute(false);
  };

  return (
    <View style={styles.mainContainer}>
      <StartRouteButton handleOnPress={handlePressStartRoute} isActiveRoute={isActiveRoute} />
      <AddCheckpointButton />

      {/* Mostrar el modal dependiendo de la visibilidad */}
      <ContactFormModal showModal={isModalVisible} setIsModalVisible={setIsModalVisible} setIsActiveRoute={setIsActiveRoute} />
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
