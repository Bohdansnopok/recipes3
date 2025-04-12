export type AuthStore = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  recipes: Recipe[] | null;
  signUp: (data: { username: string; email: string; password: string }) => Promise<{ success: boolean }>;
  signIn: (data: SignInProps) => Promise<{ success: boolean }>;
  getRecipes: () => Promise<Recipe[]>;
  getRecipesByCurrentuser: () => Promise<Recipe[]>;
  logout: () => Promise<void>
};

export type User = {
  username: string;
  email: string;
  profileImage?: string;
  createdAt?: string;
  _id?: string;
};

export type SignUpProps={
    username: string;
    email: string;
    password: string;
  }
  
  export type SignInProps = {
    email: string;
    password: string;
  }

  export type Recipe = {
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

export type RecipesResponse = {
  recipes: Recipe[];
  totalPages: number;
  totalRecipes: number;
  currentPage: number;
};

export type DeleteResponse = {
  status: number;
}