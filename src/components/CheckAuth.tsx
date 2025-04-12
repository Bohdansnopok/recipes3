"use client"

import { useEffect } from "react";
import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "next/navigation";

const CheckAuth = ({ children }: { children: React.ReactNode }) => {
  const { token, user } = useAuthStore();
  const router = useRouter();
 
  useEffect(() => {
    if (!token && user === null) {
      router.push("/signIn");
    }else{
        router.push("/")
    }
  }, [user, router]);

  return <>{children}</>;
};

export default CheckAuth;

