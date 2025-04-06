import { create } from 'zustand';
import { BACKEND_API } from '@/constants/BackendApi';
import { AuthStoreProps, SignInProps, SignUpProps } from '@/types/Store';
import axios from 'axios';
// import { headers } from 'next/headers';

export const useAuthStore = create<AuthStoreProps>((set, get) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isVerified: false,
    isLoading: false,

    signUp: async ({ username, email, password }: SignUpProps) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(`${BACKEND_API}/api/auth/register`, { username, email, password });
            set({ user: response.data.user, isLoading: false, isAuthenticated: true });
            console.log("User after signUp:", get().user);
        } catch (error: unknown) {
            console.log(error);
            set({ isLoading: false, error: 'Registration failed' });
        }
    },

    signIn: async ({ email, password }: SignInProps) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(`${BACKEND_API}/api/auth/login`, { email, password })
            set({ user: response.data.user, isLoading: false, isVerified: true });
            console.log("User after LoginUp:", get().user);
        } catch (error: unknown) {
            console.log(error);
            set({ isLoading: false, error: 'Registration failed' });
        }
    }
}));