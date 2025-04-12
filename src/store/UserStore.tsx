import axios from 'axios';
import { create } from 'zustand';
import {AuthStore, RecipesResponse} from '@/types/Store'

export const UserStore = create<AuthStore>((set) => {
  return {
    user: null,
    isLoading: false,
    token:null,
    recipes:null,

    signUp: async ({ username, email, password }) => {
      set({ isLoading: true });
      try {
        const res = await axios.post(
          "https://recipe-yt.onrender.com/api/auth/register",
          { username, email, password },
          { headers: { "Content-Type": "application/json" } }
        );

        const { token, user } = res.data;

        if (!token || !user) throw new Error("Ошибка регистрации");

        localStorage.setItem("token", token);
        localStorage.setItem("userName", username);
        localStorage.setItem("userEmail", email);

        if (user) {
          const userFirstSignUp = new Date().toLocaleDateString("ru-RU");
          localStorage.setItem("userFirstSignUp", userFirstSignUp);
        }

        set({ user: user, isLoading: false });

        return { success: true };
      } catch (error) {
        console.error("Registration error:", error);
        set({ isLoading: false });
        return { success: false };
      }
    },

    signIn: async ({ email, password }) => {
      set({ isLoading: true });
      try {
        const res = await axios.post(
          "https://recipe-yt.onrender.com/api/auth/login",
          { email, password },
          { headers: { "Content-Type": "application/json" } }
        );

        const { token, user } = res.data;

        if (!token || !user) throw new Error("Ошибка входа");

        localStorage.setItem("token", token);
        localStorage.setItem("userEmail", email);
        set({ user: user, isLoading: false });

        if (user) {
          const userFirstSignUp = new Date().toLocaleDateString("ru-RU");
          localStorage.setItem("userFirstSignUp", userFirstSignUp);
        }

        return { success: true };
      } catch (error) {
        console.error("Login error:", error);
        set({ isLoading: false });
        return { success: false };
      }
    },

    logout: async () => {
      try {
        localStorage.clear();
        set({ user: null, isLoading: false });
      } catch (error) {
        console.error("Logout error:", error);
      }
    },

    getRecipes: async (): Promise<RecipesResponse | null> => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        if (!token) {
          console.log("No token found in localStorage");
          return null;
        }

        const res = await axios.get("https://recipe-yt.onrender.com/api/recipes", {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (res.status !== 200) {
          console.error("Error response:", res.statusText);
          return null;
        }

        const data: RecipesResponse = res.data;
        console.log("Received data:", data);
        return data;
      } catch (err) {
        console.error("Error fetching recipes:", err);
        return null;
      }
    },

    getRecipesByCurrentuser: async (): Promise<RecipesResponse | null> => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        if (!token) {
          console.log("No token found in localStorage");
          return null;
        }

        const res = await axios.get("https://recipe-yt.onrender.com/api/recipes/user", {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        // Check if the response status indicates an error
        if (res.status !== 200) {
          console.error("Error response:", res.statusText);
          return null;
        }

        const data: RecipesResponse = res.data; // Directly access res.data with axios
        console.log("Received data:", data);
        return data;
      } catch (err) {
        console.error("Error fetching recipes:", err);
        return null;
      }
    },
  };
});