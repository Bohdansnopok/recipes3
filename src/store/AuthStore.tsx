import { create } from 'zustand';
import { BACKEND_API } from '@/constants/BackendApi';
import { AuthStoreProps, SignInProps, SignUpProps } from '@/types/Store';
import axios from 'axios';
import Cookies from 'js-cookie';
// import { headers } from 'next/headers';

export const useAuthStore = create<AuthStoreProps>((set, get) => ({
    user: { _id: 0, username: '', email: '', profileImage: null },
    isAuthenticated: false,
    error: null,
    isVerified: false,
    isLoading: false,
    token: null,
    recipes: null,
    _id: 0,
    title: "",
    caption: "",
    image: null,
    rating: 0,
    createdAt: new Date,
    updatedAt: new Date,

    // Перевірка куків при завантаженні сторінки
    // checkCookies: () => {
    //     const token = Cookies.get('token');  // Получаем токен из куки
    //     if (token) {
    //         // Обновляем состояние, если токен есть и пользователь еще не аутентифицирован
    //         if (!get().isAuthenticated) {
    //             set({ token, isAuthenticated: true });
    //             console.log("Токен відновлено після перевірки:", token);  // Логируем токен
    //         }
    //     } else {
    //         if (typeof window !== 'undefined') {
    //             alert("Токена нету");
    //         }
    //     }
    // },



    signUp: async ({ username, email, password }: SignUpProps) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(`${BACKEND_API}/api/auth/register`, { username, email, password });
            set({ user: response.data.user, isLoading: false, isAuthenticated: true });
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
            console.log(response.data)
            // Зберігаємо користувача в куки після успішного входу
            Cookies.set('token', response.data.token, { expires: 7, path: '/', sameSite: 'Lax', secure: false });


            // Выводим данные пользователя из store
            console.log("User після входу:", get().user);
            // Выводим содержимое куки в консоль браузера
            console.log("Cookie 'token':", Cookies.get('token'));
        } catch (error: any) {
            console.log(error);
            const errorMessage = error?.response?.data?.message || 'Вхід не вдалося';
            set({ isLoading: false, error: errorMessage });
        }
    },

    getRecipes: async () => {
        set({ isLoading: true });
        try {
            const userCockies = Cookies.get('token'); // Получаем токен из куки
            console.log(userCockies); // Логируем, что содержится в куке
    
            if (!userCockies) throw new Error("Кукисов нету"); // Если куки нету, выбрасываем ошибку
    
            // Токен не нужно парсить, если это просто строка
            const token = userCockies; 
    
            // Делаем запрос с токеном в заголовке Authorization
            const response = await axios.get(`${BACKEND_API}/api/recipes`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
    
            set({ recipes: response.data.recipes, isLoading: false });
            console.log("Recipes after Getting:", get().recipes);
            return response.data.recipes;
        } catch (e: any) {
            console.error('Ошибка при получении рецептов:', e);
            set({ isLoading: false, error: e });
            return [];
        }
    }
    

}));

// Перевірка куків при завантаженні сторінки для кожної сторінки/компонента
// useAuthStore.getState().checkCookies();