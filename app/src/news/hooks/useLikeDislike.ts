import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ReactionEntity,
  ReactionType,
} from "../domain/entities/reaction_entity";
import { LikeOrDislikeUseCase } from "../domain/use_cases/like_or_dislike_usecase";
import { useState } from "react";
import { useUser } from "@/src/user/context/user_context";
import { showErrorMessage } from "@/src/common/errors/error_message";

interface UseLikeDislikeProps {
  newsId: number;
  initialReactions: Pick<ReactionEntity, "likes" | "dislikes">;
  initialUserReaction?: ReactionType | null;
}

export const useLikeDislike = ({
  newsId,
  initialReactions = { likes: 0, dislikes: 0 },
  initialUserReaction = null,
}: UseLikeDislikeProps) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [reactions, setReactions] = useState(initialReactions);
  const [currentReaction, setCurrentReaction] = useState<ReactionType | null>(
    initialUserReaction
  );

  const likeOrDislikeUseCase = new LikeOrDislikeUseCase();

  const mutation = useMutation({
    mutationFn: async (reactionType: ReactionType) => {
      console.log("Enviando newsId:", newsId);
      if (!user) {
        throw new Error("User not authenticated");
      }
      return await likeOrDislikeUseCase.execute({
        newsId,
        userId: user.id,
        reactionType: reactionType as "like" | "dislike",
      });
    },
    onMutate: async (reactionType) => {
      const previousReaction = currentReaction;
      const previousReactions = { ...reactions };

      // Optimistic Update
      setReactions((prev) => {
        const updated = { ...prev };

        if (previousReaction) {
          updated[`${previousReaction}s`]--;
        }

        if (reactionType !== previousReaction) {
          updated[`${reactionType}s` as "likes" | "dislikes"]++;
        }

        return updated;
      });

      setCurrentReaction(
        reactionType === currentReaction ? null : reactionType
      );

      return { previousReaction, previousReactions };
    },
    onError: (error, _, context) => {
      // Revert optimistic updates
      setReactions(context?.previousReactions || initialReactions);
      setCurrentReaction(context?.previousReaction || initialUserReaction);

      showErrorMessage(
        error instanceof Error ? error.message : "Failed to update reaction"
      );
    },
    onSettled: () => {
      // Sync with server
      queryClient.invalidateQueries({ queryKey: ["news", newsId] });
    },
  });

  const handleReaction = (type: ReactionType) => {
    if (!user) {
      showErrorMessage(
        "Por favor inicia sesión para reaccionar a las noticias."
      );
      return;
    }

    mutation.mutate(type);
  };

  return {
    reactions,
    currentReaction,
    mutation,
    handleReaction,
  };
};
