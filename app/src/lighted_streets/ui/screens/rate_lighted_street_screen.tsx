import { APP_THEME } from "@/common/theme/theme";
import Foundation from "@expo/vector-icons/Foundation";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { useRateLightedStreet } from "../../hooks/useRateLightedStreet";
import React from "react";
import Slider from "@react-native-community/slider";
import { CustomEndButton } from "@/src/checkpoint/ui/components/custom_end_button";
import { FullLoaderScreen } from "@/common/screens/full_loader_screen";

/**
 * Props for the RateLightedStreetScreen component.
 */
interface RateLightedStreetScreenProps {
  streedId: string; // ID of the street to be rated
}

/**
 * Screen component for rating the lighting of a street.
 * 
 * @param {RateLightedStreetScreenProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const RateLightedStreetScreen = ({
  streedId,
}: RateLightedStreetScreenProps): JSX.Element => {
  // Custom hook to handle rating logic
  const { rating, setRating, onSubmit, mutation } =
    useRateLightedStreet(streedId);

  // Show a loading screen while the mutation is pending
  if (mutation.isPending) {
    return <FullLoaderScreen />;
  }

  return (
    <ScrollView
      style={styles.innerContainer}
      contentContainerStyle={styles.rootContainer}
    >
      <View style={styles.container}>
        <Text style={styles.title} numberOfLines={2}>
          ¿Qué tal es la iluminación de esta calle?
        </Text>
        <Foundation
          name="lightbulb"
          size={100}
          color={`rgba(255, 223, 0, ${rating / 5})`}
          style={styles.icon}
        />
        <Slider
          value={rating}
          onValueChange={setRating}
          minimumValue={0}
          maximumValue={5}
          step={0.1}
          style={styles.slider}
          thumbTintColor="#FFD700"
          minimumTrackTintColor="#FFD700"
          maximumTrackTintColor="#000000"
        />
        <Text style={styles.content}>
          {rating < 1
            ? "Muy mala"
            : rating >= 1 && rating < 2
            ? "Mala"
            : rating >= 2 && rating < 3
            ? "Suficiente"
            : rating >= 3 && rating < 4
            ? "Buena"
            : "Excelente"}
        </Text>
      </View>
      <CustomEndButton message="Calificar" onPress={onSubmit} />
    </ScrollView>
  );
};

/**
 * Styles for the RateLightedStreetScreen component.
 */
const styles = StyleSheet.create({
  rootContainer: {
    gap: 30,
    paddingHorizontal: 30,
    paddingVertical: 20,
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    backgroundColor: APP_THEME.colors.background,
  },
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: APP_THEME.colors.background,
    borderRadius: 12,
    borderWidth: 1,
    margin: 20,
    borderColor: APP_THEME.colors.tertiary,
    gap: 18,
    elevation: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    marginBottom: 20,
    justifyContent: "center",
  },
  slider: {
    width: 300,
  },
  content: {
    fontSize: 15,
    lineHeight: 25,
    letterSpacing: 0.5,
    textAlign: "center",
  },
});
