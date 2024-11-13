import { APP_THEME } from "@/common/theme/theme";
import React, { useRef } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import {
  Callout,
  LatLng,
  MapMarker,
  Marker,
  Polyline,
} from "react-native-maps";

/**
 * Props interface for LightedStreet component.
 * @property {LatLng[]} coordinates - Array of coordinates representing the polyline.
 * @property {number} rating - Rating value to determine the stroke width of the polyline.
 * @property {() => void} [onPress] - Optional callback function to handle press events.
 * @property {boolean} [showRateButton] - Optional flag to show or hide the rate button.
 */
interface Props {
  coordinates: LatLng[];
  rating: number;
  onPress?: () => void;
  showRateButton?: boolean;
}

/**
 * LightedStreet component renders a polyline with three layers of different stroke widths and opacities.
 * @param {Props} props - The properties object.
 * @param {LatLng[]} props.coordinates - Array of coordinates for the polyline.
 * @param {number} props.rating - Rating value to determine the stroke width of the polyline.
 * @param {() => void} [props.onPress] - Optional callback function to handle press events.
 * @param {boolean} [props.showRateButton] - Optional flag to show or hide the rate button.
 * @returns {JSX.Element} A Fragment containing three Polyline components and optionally a Marker with a Callout.
 */
export const LightedStreet = ({
  coordinates,
  rating,
  onPress,
  showRateButton,
}: Props) => {
  const markerRef = useRef<MapMarker | null>(null); // Use useRef to store the marker reference

  /**
   * Handles the press event on the polyline.
   * Shows the callout of the marker if it exists.
   */
  const handlePress = () => {
    if (markerRef.current) {
      markerRef.current.showCallout(); // Show callout when polyline is pressed
    }
  };

  return (
    <>
      {/* Outer glow with low opacity */}
      <Polyline
        tappable={true} // Enable tap events
        coordinates={coordinates}
        strokeColor="rgba(255, 255, 0, 0.2)" // Color amarillo con baja opacidad para el resplandor exterior
        strokeWidth={rating * 2.4} // Ancho mayor para el resplandor exterior
        onPress={handlePress} // Add onPress event
      />
      {/* Intermediate glow with medium opacity */}
      <Polyline
        tappable={true} // Enable tap events
        coordinates={coordinates}
        strokeColor="rgba(255, 255, 0, 0.5)" // Color amarillo con media opacidad para el resplandor intermedio
        strokeWidth={rating * 1.4} // Ancho intermedio para el resplandor intermedio
        onPress={handlePress} // Add onPress event
      />
      {/* Main line with solid color */}
      <Polyline
        tappable={true} // Enable tap events
        coordinates={coordinates}
        strokeColor="yellow" // Color amarillo sólido para la línea principal
        strokeWidth={rating * 0.9} // Ancho menor para la línea principal
        onPress={handlePress} // Add onPress event
      />
      {showRateButton && (
        <Marker
          ref={markerRef} // Add reference to the marker
          coordinate={
            coordinates.length % 2 === 0
              ? coordinates[coordinates.length / 2]
              : coordinates[(coordinates.length - 1) / 2]
          }
          anchor={{ x: 0.5, y: 0.1 }}
          style={{ opacity: 0 }}
        >
          <Callout onPress={onPress}>
            <View>
              <Button title="Calificar" />
            </View>
          </Callout>
        </Marker>
      )}
    </>
  );
};
