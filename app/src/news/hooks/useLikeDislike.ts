import { useQuery, useMutation } from "@tanstack/react-query";
import { ReactionEntity } from "../domain/entities/reaction_entity";
import { LikeOrDislikeUseCase } from "../domain/use_cases/like_or_dislike_usecase";
import { useState } from "react";
import { useUser } from "@/src/user/context/user_context";

export const useLikeDislike = (reaction: ReactionEntity) => {
  const { user } = useUser();
  const [useCase] = useState(() => new LikeOrDislikeUseCase());

  // Query para obtener las reacciones iniciales
  const queryReaction = useQuery({
    queryKey: ["reactions", reaction],
    queryFn: async () => await useCase.execute(reaction),
    staleTime: 300000,
  });

  // Mutation para actualizar las reacciones
  const mutation = useMutation({
    mutationFn: (reactionType: "like" | "dislike") => useCase.execute(reaction),
    onSuccess: () => {
      queryReaction.refetch();
    },
  });

  return {
    reactions: queryReaction.data,
    isLoading: queryReaction.isLoading,
    error: queryReaction.error,
    updateLikeOrDislike: mutation.mutate,
    queryReaction,
  };
};
