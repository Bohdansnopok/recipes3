"use client"

import { useEffect } from "react";
import { UserStore } from "@/store/UserStore";
import { useRouter } from "next/navigation";

const CheckAuth = ({ children }: { children: React.ReactNode }) => {
  const { token } = UserStore();
  const router = useRouter();

  useEffect(() => {
    if (token === null) {
      router.push("/signIn");
    }
  }, [router]);

  return <>{children}</>;
};

export default CheckAuth;

