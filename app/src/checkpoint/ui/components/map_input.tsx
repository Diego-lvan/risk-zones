import { APP_THEME } from "@/common/theme/theme";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView from "react-native-maps";

interface MapInputProps {
  label?: string;
}

export const MapInput = ({ label }: MapInputProps) => {
  const handlePress = () => {
    console.log("Map pressed");
  };

  return (
    <View style={styles.mainContainer}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity style={styles.map} onPress={handlePress}>
        <MapView style={{ flex: 1 }} scrollEnabled={false} />
      </TouchableOpacity>
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
