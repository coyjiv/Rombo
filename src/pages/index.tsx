import Image from "next/image";
import { Inter } from "next/font/google";
import Counter from "@/components/Counter";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user.isLoggedIn) {
      router.replace("/login")
    }
  }, [user]);
  console.log(user);

  return <></>;
}
