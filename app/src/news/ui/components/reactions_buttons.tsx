import React, { useState } from "react";
import { View, Button, Text, TouchableOpacity, Image } from "react-native";
import { useLikeDislike } from "../../hooks/useLikeDislike";
import { ReactionEntity } from "../../domain/entities/reaction_entity";

interface ReactionButtonsProps {
  reactionInfo: ReactionEntity;
}

export const ReactionsButtons = ({
  reactionInfo: { likes, dislikes },
}: ReactionButtonsProps) => {
  const [userReaction, setUserReaction] = useState<"like" | "dislike" | null>(
    null
  );

  const handleLike = () => {
    if (userReaction === "like") {
      //setLikes((prevLikes) => prevLikes - 1);
      setUserReaction(null);
    } else {
      //setLikes((prevLikes) => prevLikes + 1);
      if (userReaction === "dislike") {
        //setDislikes((prevDislikes) => prevDislikes - 1);
      }
      setUserReaction("like");
    }
  };

  const handleDislike = () => {
    if (userReaction === "dislike") {
      //setDislikes((prevDislikes) => prevDislikes - 1);
      setUserReaction(null);
    } else {
      //setDislikes((prevDislikes) => prevDislikes + 1);
      if (userReaction === "like") {
        //setLikes((prevLikes) => prevLikes - 1);
      }
      setUserReaction("dislike");
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
        <TouchableOpacity onPress={handleLike}>
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
        <TouchableOpacity onPress={handleDislike}>
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
