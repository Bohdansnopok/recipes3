// src/api/getRecipes.ts
import { useAuthStore } from "@/store/authStore";

type Recipe = {
  _id: string;
  title: string;
  caption: string;
  image: string;
  rating: number;
  user: {
    _id: string;
    username: string;
    profileImage: string;
  };
  createdAt: string;
  updatedAt: string;
};

type RecipesResponse = {
  recipes: Recipe[];
  currentPage: number;
  totalRecipes: number;
  totalPages: number;
};

export const getRecipes = async (): Promise<RecipesResponse> => {
  const token = useAuthStore.getState().token;

  if (!token) throw new Error("токена нетууу(");

  const res = await fetch("https://recipe-yt.onrender.com/api/recipes", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Ошибка");
  }

  return res.json();
};