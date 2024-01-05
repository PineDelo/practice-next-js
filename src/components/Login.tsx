"use client";
import React, { useEffect, useState, useRef } from "react";
import { Input, Space, Carousel, Flex, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Cookies from "js-cookie";
import { auth } from "@/firebase/config";
import axiosInstance from "../utils/apis";
import Styles from "@/styles/app/components/login.module.scss";
import Alerts from "@/components/Alerts";

type AccountProps = {
  email: string;
  password: string;
};

export default function Login() {
  const [alert, setAlert] = useState({
    type: "",
    message: "",
    isClose: false,
  });
  const [carouselList, setCarouselList] = useState([]);
  const [account, setAccount] = useState<AccountProps>({
    email: "",
    password: "",
  });

  const carouselRef = useRef<any>();
  const router = useRouter();

  useEffect(() => {
    axiosInstance
      .get("/movie/upcoming", {
        params: {
          page: 1,
        },
      })
      .then((res) => {
        if (res.data) {
          setCarouselList(res.data.results);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const signInHandler = async () => {
    await signInWithEmailAndPassword(auth, account.email, account.password)
      .then((userCredential) => {
        return userCredential.user.getIdToken().then((idToken) => {
          Cookies.set("mvdb_name", idToken);
          router.push("/top_rated");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(
          `[Error] route: /signInHandler code: ${errorCode} | msg: ${errorMessage}`
        );
        return setAlert({
          ...alert,
          message: "Please check your account",
          type: "error",
          isClose: true,
        });
      });
  };

  const signUpHandler = async () => {
    await createUserWithEmailAndPassword(auth, account.email, account.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setAccount({ email: "", password: "" });
        setAlert((prev) => {
          const current = {
            ...prev,
            type: "success",
            message: "Sign up success",
            isClose: true,
          };
          return current;
        });
        carouselRef.current.goTo(0);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(
          `[Error] route: /signUpHandler code: ${errorCode} | msg: ${errorMessage}`
        );
      });
  };

  return (
    <main className={Styles.main}>
      {alert.isClose && (
        <Alerts type={alert.type} message={alert.message} setState={setAlert} />
      )}

      <div className={Styles.main_section}>
        <section className={Styles.carousel_img_wrapper}>
          <Carousel autoplay dots={false}>
            {carouselList?.map((data: any, index: number) => {
              if (index <= 10) {
                return;
              }
              return (
                <div key={index}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500` + data.poster_path}
                    alt="moview poster"
                    width={320}
                    height={480}
                    priority
                  />
                </div>
              );
            })}
          </Carousel>
        </section>
        <section className={Styles.carousel_auth_wrapper}>
          <Carousel fade dots={false} ref={carouselRef}>
            <div>
              <Flex
                className={Styles.auth_flex}
                vertical
                justify="space-between"
              >
                <Space direction="vertical" size="middle">
                  <p className={Styles.logo}>Movie App</p>
                  <Input
                    placeholder="e-mail"
                    autoFocus
                    size="large"
                    onChange={(e) =>
                      setAccount({ ...account, email: e.target.value })
                    }
                    value={account.email}
                  />
                  <Input.Password
                    placeholder="password"
                    size="large"
                    onChange={(e) =>
                      setAccount({ ...account, password: e.target.value })
                    }
                    value={account.password}
                  />
                  <p
                    className={Styles.sign_up}
                    onClick={() => {
                      carouselRef.current.next();
                    }}
                  >
                    Create New Account
                  </p>
                </Space>
                <Button type="primary" size="large" onClick={signInHandler}>
                  Sign In
                </Button>
              </Flex>
            </div>
            {/* Sign Up */}
            <div>
              <Flex
                className={Styles.auth_flex}
                vertical
                justify="space-between"
              >
                <Space direction="vertical" size="middle">
                  <ArrowLeftOutlined
                    onClick={() => carouselRef.current.prev()}
                    style={{ fontSize: "24px", color: "#222224" }}
                  />
                  <Input
                    placeholder="e-mail"
                    autoFocus
                    size="large"
                    onChange={(e) =>
                      setAccount({ ...account, email: e.target.value })
                    }
                    value={account.email}
                  />
                  <Input.Password
                    placeholder="password"
                    size="large"
                    onChange={(e) =>
                      setAccount({ ...account, password: e.target.value })
                    }
                    value={account.password}
                  />
                </Space>
                <Button type="primary" size="large" onClick={signUpHandler}>
                  Sign Up
                </Button>
              </Flex>
            </div>
          </Carousel>
        </section>
      </div>
    </main>
  );
}
