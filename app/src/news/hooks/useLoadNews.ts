import { useEffect, useState } from "react";
import { SeeNewsUseCase } from "../domain/use_cases/see_news_use_case";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook to load a new information
 * @param newId The id of the new
 * @returns The query and refetch function
 */
export const useLoadNews = (newId: number) => {
  const [seeNewsUsecase] = useState(() => new SeeNewsUseCase());
  const query = useQuery({
    queryKey: ["new", newId],
    queryFn: async () => await seeNewsUsecase.execute(newId),
  });

  return { query };
};
