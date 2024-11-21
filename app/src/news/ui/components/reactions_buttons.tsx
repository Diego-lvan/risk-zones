import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  ReactionEntity,
  ReactionType,
} from "../../domain/entities/reaction_entity";

interface ReactionButtonsProps {
  likes: number;
  dislikes: number;
  userReaction: ReactionType;
  onReaction: (type: "like" | "dislike") => void;
  isLoading?: boolean;
  //refetchReactions: () => void;
}

export const ReactionsButtons = ({
  likes,
  dislikes,
  userReaction,
  onReaction,
  isLoading = false,
}: //refetchReactions,
ReactionButtonsProps) => {
  const handleReaction = (type: "like" | "dislike") => {
    if (!isLoading) {
      if (userReaction !== type) {
        onReaction(type);
      } else {
        onReaction(type); // Llamada a la función que actualiza el estado de la reacción
      }
      //refetchReactions();
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
      }}
    >
      <View style={{ alignItems: "center", marginRight: 20 }}>
        <TouchableOpacity
          style={{ padding: 15 }}
          onPress={() => handleReaction("like")}
        >
          <Image
            source={
              userReaction === "like"
                ? require("../../../../assets/icons/thumb-up-blue.png")
                : require("../../../../assets/icons/thumb-up-gray.png")
            }
            style={{ width: 19, height: 20 }}
          />
        </TouchableOpacity>
        <Text style={{ marginTop: 5 }}>{likes}</Text>
      </View>
      <View style={{ alignItems: "center", marginRight: 20 }}>
        <TouchableOpacity
          style={{ padding: 15 }}
          onPress={() => handleReaction("dislike")}
        >
          <Image
            source={
              userReaction === "dislike"
                ? require("../../../../assets/icons/thumb-down-blue.png")
                : require("../../../../assets/icons/thumb-down-gray.png")
            }
            style={{ width: 19, height: 20 }}
          />
        </TouchableOpacity>
        <Text style={{ marginTop: 5 }}>{dislikes}</Text>
      </View>
    </View>
  );
};
