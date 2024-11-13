/**
 * Hook to handle the rating of a lighted street.
 * @param streetId - The ID of the street to be rated.
 * @returns An object containing the rating state, setRating function, onSubmit function, and mutation object.
 */
import { useRef, useState } from "react";
import { RateLightedStreetUseCase } from "../domain/use_cases/rate_lighted_street_use_case";
import { LightedStreetRatingForm } from "../domain/entities/lighted_street_rating_form";
import { showErrorMessage } from "@/src/common/errors/error_message";
import { useUser } from "@/src/user/context/user_context";
import { router } from "expo-router";
import { Alert } from "react-native";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import * as SecureStorage from "expo-secure-store";

export const useRateLightedStreet = (streetId: string) => {
  // State to manage the rating value
  const [rating, setRating] = useState(2.5);
  // Get the current user from the user context
  const { user } = useUser();

  // Create an instance of RateLightedStreetUseCase
  const rateLightedStreetUseCase = useRef(
    new RateLightedStreetUseCase()
  ).current;

  // Function to handle the press event
  const onPress = () => {
    router.dismissAll();
  };

  // Function to handle successful save
  const onSuccessfulSave = () => {
    Alert.alert("Exito", "Calle calificada correctamente", [
      ...(onPress
        ? [
            {
              text: "Confirmar",
              onPress: onPress,
            },
          ]
        : []),
    ]);
  };

  // Function to handle errors during save
  const onErrorSave = (error: Error) => {
    if (axios.isAxiosError(error)) {
      error as AxiosError;
      if (error.code === axios.AxiosError.ERR_NETWORK) {
        showErrorMessage("Sin conexión a internet");
      } else {
        showErrorMessage(error.response?.data.message);
      }
    }
  };

  // Mutation object to handle the rating submission
  const mutation = useMutation({
    mutationFn: (data: LightedStreetRatingForm) =>
      rateLightedStreetUseCase.execute(data),
    onSuccess: onSuccessfulSave,
    onError: onErrorSave,
  });

  // Function to handle the form submission
  const onSubmit = () => {
    if (!user) {
      showErrorMessage("Usuario no encontrado");
      return;
    }

    const data: LightedStreetRatingForm = {
      rating,
      streetId,
      userId: user.id,
    };

    // Save the rating data securely
    const saveData = async (data: LightedStreetRatingForm) => {
      await SecureStorage.setItemAsync(data.streetId, JSON.stringify(data));
    };

    mutation.mutate(data);
    saveData(data);
  };

  return {
    rating,
    setRating,
    onSubmit,
    mutation,
  };
};
