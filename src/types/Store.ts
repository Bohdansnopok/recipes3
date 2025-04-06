export type AuthStoreProps = {
    user: null | { name: string; email: string }; // или другой тип, если у тебя есть интерфейс User
    isAuthenticated: boolean;
    error: null | string;
    isLoading: boolean;
    isVerified: boolean;
    checkCookies: () => void;
    signUp: (data: SignUpProps) => Promise<void>;
    signIn:(data:SignInProps) => Promise<void>
  };
  

export type SignUpProps={
    username: string;
    email: string;
    password: string;
  }
  
  export type SignInProps={
    email: string;
    password: string;
  }