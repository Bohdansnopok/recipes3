export type AuthStoreProps = {
    user: null | {  _id:number; username: string; email: string, profileImage:string| null;  }; // или другой тип, если у тебя есть интерфейс User
    isAuthenticated: boolean;
    error: null | string;
    isLoading: boolean;
    isVerified: boolean;
    recipes: Recipe[] | null;
    _id: number;
    title: string;
    caption: string;
    image: string | null;
    rating: number;
    token:string | null
    createdAt: Date;
    updatedAt: Date;
    // checkCookies: () => void;
    signUp: (data: SignUpProps) => Promise<void>;
    signIn:(data:SignInProps) => Promise<void>;
    getRecipes: () => Promise<Recipe[]>;
  };
  

export type SignUpProps={
    username: string;
    email: string;
    password: string;
  }
  
  export type SignInProps={
    email: string;
    password: string;
    token: string;
  }

  export type Recipes={
    recipes: Recipe[] | null;
  } 

  export type Recipe = {
    _id: number;
    title: string;
    caption: string;
    image: string;
    rating: number;
    user:{
      _id:number;
      username:string;
      profileImage:string
    }
    createdAt: Date;
    updatedAt: Date;
  };