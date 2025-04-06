import { create } from 'zustand';
import { BACKEND_API } from '@/constants/BackendApi';
import { AuthStoreProps, SignInProps, SignUpProps } from '@/types/Store';
import axios from 'axios';
import Cookies from 'js-cookie';

export const useAuthStore = create<AuthStoreProps>((set, get) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isVerified: false,
    isLoading: false,

    // Перевірка куків при завантаженні сторінки
    checkCookies: () => {
        const user = Cookies.get('user');
        if (user) {
            set({ user: JSON.parse(user), isAuthenticated: true });
            console.log("Куки відновлено після перевірки:", user);
        }
    },

    signUp: async ({ username, email, password }: SignUpProps) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(`${BACKEND_API}/api/auth/register`, { username, email, password });
            set({ user: response.data.user, isLoading: false, isAuthenticated: true });

            // Зберігаємо користувача в куки після успішної реєстрації
            Cookies.set('user', JSON.stringify(response.data.user), { expires: 7, path: '/' });
            Cookies.set('user', JSON.stringify(response.data.user), { expires: 7, path: '/', sameSite: 'Lax' });
            console.log("User після реєстрації:", get().user);
        } catch (error: any) {
            console.log(error);
            const errorMessage = error?.response?.data?.message || 'Реєстрація не вдалася';
            set({ isLoading: false, error: errorMessage });
        }
    },

    signIn: async ({ email, password }: SignInProps) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(`${BACKEND_API}/api/auth/login`, { email, password });
            set({ user: response.data.user, isLoading: false, isVerified: true });

            // Зберігаємо користувача в куки після успішного входу
            Cookies.set('user', JSON.stringify(response.data.user), { expires: 7, path: '/' });
            Cookies.set('user', JSON.stringify(response.data.user), { expires: 7, path: '/', sameSite: 'Lax' });
            console.log("User після входу:", get().user);
        } catch (error: any) {
            console.log(error);
            const errorMessage = error?.response?.data?.message || 'Вхід не вдалося';
            set({ isLoading: false, error: errorMessage });
        }
    }
}));

// Перевірка куків при завантаженні сторінки для кожної сторінки/компонента
useAuthStore.getState().checkCookies();