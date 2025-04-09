import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../api/getRecipes";

export const useRecipes = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};
