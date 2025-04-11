import { create } from 'zustand';

type User = {
  username: string;
  email: string;
  profileImage?: string;
  createdAt?: string;
  _id?: string;
};

export type SignInProps = {
  email: string;
  password: string;
}


// export type Recipe = {

//   _id: number;
//   title: string;
//   caption: string;
//   image: string;
//   rating: number;
//   user:{
//     _id:number;
//     username:string;
//     profileImage:string
//   }
//   createdAt: Date;
//   updatedAt: Date;
// };

export type Recipe = {
  _id: number; // или number, если ты уверен — но сейчас у тебя строка
  title: string;
  caption: string;
  image: string;
  rating: number;
  user: {
    _id: string;
    username: string;
    profileImage: string;
  };
  createdAt: string; // если ты не конвертируешь в объект Date
  updatedAt: string;
};

export type RecipesResponse = {
  recipes: Recipe[];
  totalPages: number;
  totalRecipes: number;
  currentPage: number;
};

type AuthStore = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  recipes: Recipe[] | null;
  signIn: (data: SignInProps) => Promise<{ success: boolean }>;
  signUp: (data: { username: string; email: string; password: string }) => Promise<{ success: boolean }>;
  getRecipes: () => Promise<Recipe[]>;

};

export const useAuthStore = create<AuthStore>((set, get) => {
  // const getToken = () => {
  //   if (typeof window === 'undefined') return null;
  //   return localStorage.getItem('token');
  // };

  return {
    user: null,
    isLoading: false,

    signUp: async ({ username, email, password }) => {
      set({ isLoading: true });
      try {
        const res = await fetch("https://recipe-yt.onrender.com/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });

        if (!res.ok) throw new Error("Ошибка регистрации");

        const { token, user } = await res.json();

        localStorage.setItem("token", token);
        set({ user, isLoading: false });

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
        const res = await fetch("https://recipe-yt.onrender.com/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!res.ok) throw new Error("Ошибка входа");

        const { token, user } = await res.json();

        localStorage.setItem("token", token);
        set({ user, isLoading: false });

        return { success: true };
      } catch (error) {
        console.error("Login error:", error);
        set({ isLoading: false });
        return { success: false };
      }
    },

    checkAuth: async () => {
      const token = getToken();
      if (!token) {
        set({ user: null });
        return;
      }

      try {
        const res = await fetch("https://recipe-yt.onrender.com/api/auth/check", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Не авторизован");

        const { user } = await res.json();
        set({ user });
      } catch (e) {
        console.log("Ошибка авторизации:", e);
        localStorage.removeItem("token");
        set({ user: null });
      }
    },

    logout: async () => {
      const token = getToken();
      try {
        await fetch("https://recipe-yt.onrender.com/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (e) {
        console.log("Logout failed:", e);
      }

      localStorage.removeItem("token");
      set({ user: null });
    },

    getRecipes: async (): Promise<RecipesResponse | null> => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        if (!token) {
          console.log("No token found in localStorage");
          return null;
        }

        const res = await fetch("https://recipe-yt.onrender.com/api/recipes", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("Error response:", res.statusText);
          return null;
        }

        const data: RecipesResponse = await res.json();
        console.log("Received data:", data);
        return data;
      } catch (err) {
        console.error("Error fetching recipes:", err);
        return null;
      }
    }

  };
});