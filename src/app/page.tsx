"use client";
import React, { Suspense, useEffect, useState } from "react";
import Cookies from "js-cookie";
import SplashScreen from "../components/SplashScreen";
import Styles from "@/styles/app/app.module.scss";
import Login from "../components/Login";
import Loading from "../components/Loading";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCookie, setIsCookie] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const cookie = Cookies.get("mvdb_name");
    if (cookie) {
      setIsCookie(true);
      setTimeout(() => {
        setIsLoading(false);
        router.push("/top_rated");
      }, 2000);
    } else {
      setIsCookie(false);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, []);

  return isLoading ? (
    <main className={Styles.main}>
      <SplashScreen />
    </main>
  ) : (
    <Suspense fallback={<Loading />}>{!isCookie && <Login />}</Suspense>
  );
}
