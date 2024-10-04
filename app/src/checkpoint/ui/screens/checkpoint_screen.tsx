import { View, StyleSheet } from "react-native";
import { AddCheckpointButton } from "../components/add_checkpoint_button";

export const CheckpointScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <AddCheckpointButton />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
