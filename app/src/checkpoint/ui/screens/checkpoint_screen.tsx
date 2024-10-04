import { View, StyleSheet } from "react-native";
import { AddCheckpointButton } from "../components/add_checkpoint_button";
import { StartRouteButton } from "../components/start_route_button";

export const CheckpointScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <StartRouteButton />
      <AddCheckpointButton />
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
