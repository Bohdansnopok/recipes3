// hooks/useRecipes.ts
import { useQuery } from '@tanstack/react-query';

const fetchRecipes = async () => {
  const res = await fetch("https://recipe-yt.onrender.com/api/recipes");

  if (!res.ok) throw new Error('Failed to fetch recipes');

  const data = await res.json();
  return data.recipes;
};

export const useRecipes = () => {
  return useQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
    retry: false,
    refetchInterval: 300000,  
  });
};
