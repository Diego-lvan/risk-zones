import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactionType } from "../domain/entities/reaction_entity";
import { LikeOrDislikeUseCase } from "../domain/use_cases/like_or_dislike_usecase";
import { useState } from "react";
import { useUser } from "@/src/user/context/user_context";
import { showErrorMessage } from "@/src/common/errors/error_message";

export const useLikeDislike = (newsId: number) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const likeOrDislikeUseCase = new LikeOrDislikeUseCase();

  // Query para obtener datos iniciales
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["reactions", newsId],
    queryFn: async () => {
      if (!user) {
        throw new Error("User not authenticated");
      }

      // Usamos `execute` como fuente de datos iniciales
      return await likeOrDislikeUseCase.execute({
        newsId,
        userId: user.id,
        reactionType: "like" as "like" | "dislike",
      });
    },
    staleTime: 5000,
    refetchOnWindowFocus: false,
  });

  // Manejo de mutaciones para optimismo
  const mutation = useMutation({
    mutationFn: async (reactionType: ReactionType) => {
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
      const previousReactions = queryClient.getQueryData(["reactions", newsId]);

      // Actualización optimista
      queryClient.setQueryData(["reactions", newsId], (oldData: any) => {
        if (!oldData) return oldData;

        const updatedReactions = { ...oldData };

        if (oldData.userReaction) {
          updatedReactions[`${oldData.userReaction}s`]--;
        }

        if (reactionType !== oldData.userReaction) {
          updatedReactions[`${reactionType}s`]++;
        }

        updatedReactions.userReaction =
          reactionType === oldData.userReaction ? null : reactionType;

        return updatedReactions;
      });

      return { previousReactions };
    },
    onError: (error, _, context) => {
      // Revertir cambios optimistas
      queryClient.setQueryData(
        ["reactions", newsId],
        context?.previousReactions
      );
      showErrorMessage(
        error instanceof Error ? error.message : "Failed to update reaction"
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["reactions", newsId] });
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
    reactions: data || { likes: 0, dislikes: 0, reactionType: null },
    isLoading,
    isError,
    refetch,
    handleReaction,
  };
};
