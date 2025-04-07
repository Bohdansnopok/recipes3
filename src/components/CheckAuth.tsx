"use client"

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "next/navigation";

const CheckAuth = ({ children }: { children: React.ReactNode }) => {
  const { checkCookies, user } = useAuthStore();
  const router = useRouter();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    checkCookies();
    setInitialized(true);
  }, [checkCookies]);

  useEffect(() => {
    // После инициализации, если пользователь так и не найден, редирект на страницу входа
    if (initialized && user === null) {
      router.push("/signIn");
    }
  }, [initialized, user, router]);

  // Можно отобразить спиннер или ничего не рендерить, пока не завершена проверка
  if (!initialized) return null;

  return <>{children}</>;
};

export default CheckAuth;

