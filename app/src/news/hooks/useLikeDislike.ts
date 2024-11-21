import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactionType } from "../domain/entities/reaction_entity";
import { LikeOrDislikeUseCase } from "../domain/use_cases/like_or_dislike_usecase";
import { useEffect, useState } from "react";
import { useUser } from "@/src/user/context/user_context";
import { showErrorMessage } from "@/src/common/errors/error_message";

export const useLikeDislike = (newsId: number) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const likeOrDislikeUseCase = new LikeOrDislikeUseCase();
  const [reactions, setReactions] = useState(null);

  const [reactionType, setReactionType] = useState<ReactionType>(null);

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
        reactionType: reactionType,
      });
    },
    staleTime: 500,
    refetchOnWindowFocus: true,
    enabled: !!user,
  });
  useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, []);

  useEffect(() => {
    // Establecer el estado de reactionType cuando los detalles de la noticia se cargan
    if (data && data.reactionType !== null) {
      console.log("Datos recibidos del backend:", data);
      setReactionType(data.reactionType);
    }
  }, [data]);

  // Manejo de mutaciones para optimismo
  const mutation = useMutation({
    mutationFn: async (reactionType: ReactionType) => {
      if (!user) {
        throw new Error("User not authenticated");
      }
      return await likeOrDislikeUseCase.execute({
        newsId,
        userId: user.id,
        reactionType: reactionType,
      });
    },
    onMutate: async (reactionType) => {
      const previousReactions = queryClient.getQueryData(["reactions", newsId]);

      // Actualización optimista
      queryClient.setQueryData(["reactions", newsId], (oldData: any) => {
        if (!oldData) return oldData;

        const updatedReactions = { ...oldData };

        // Si el usuario está cambiando su reacción
        if (reactionType !== oldData.reactionType) {
          // Decrementar la reacción anterior
          if (oldData.reactionType === "like") {
            updatedReactions.likes--;
          } else if (oldData.reactionType === "dislike") {
            updatedReactions.dislikes--;
          }

          // Incrementar la nueva reacción
          if (reactionType === "like") {
            updatedReactions.likes++;
          } else if (reactionType === "dislike") {
            updatedReactions.dislikes++;
          }
        }

        // Actualizamos el tipo de reacción
        updatedReactions.reactionType = reactionType;
        return updatedReactions;
      });

      return { previousReactions };
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
    if (!type) {
      console.error("Reacción no válida");
      return;
    }
    if (reactionType === type) {
      setReactionType(type);
      mutation.mutate(type);
    } else {
      setReactionType(type); // Cambiar la reacción a "like" o "dislike"
      mutation.mutate(type); // Enviar la nueva reacción al backend
    }
  };

  return {
    reactions: data,
    isLoading,
    isError,
    refetchReactions: refetch,
    handleReaction,
  };
};
