import "../../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { wrapper } from "../redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { InitialState, InitialState2 } from "../redux/state";
import { useRouter } from "next/router";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";
import { checkJWT, checkRefreshToken } from "../utils/authRoutes";
const MyApp = (
  { Component, pageProps }: AppProps,
  props: { cookie: string },
) => {
  const state = useSelector(
    (state: { authReducer: InitialState }) => state.authReducer,
  );

  const setState = useSelector(
    (state: { setReducer: InitialState2 }) => state.setReducer,
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const cookie = useCookie(props.cookie);

  //trigger on route change and on page load
  useEffect(() => {
    const response = checkJWT(cookie.get("token"));
    if (!cookie.get("refresh_token") && !response) {
      //check if both jwt and refresh token are expired
      cookie.remove("name");
      cookie.remove("token");
      cookie.remove("refresh_token");
      dispatch({ type: "SIGN_OUT" });
    }
    if (cookie.get("refresh_token") && !cookie.get("token")) {
      //if refresh token isnt expired but jwt is,The refresh token will refresh jwt
      const res = async () => {
        const expireIn = state.remember_me ? 31556952 : 3600;
        const refreshExpireIn = state.remember_me ? 63113904 : 7200;
        const res = await checkRefreshToken(cookie.get("refresh_token"));
        if (res) {
          cookie.set("name", res.name, {
            maxAge: expireIn,
            sameSite: "strict",
            path: "/",
          });
          cookie.set("token", res.JWT, {
            maxAge: expireIn,
            sameSite: "strict",
            path: "/",
          });
          cookie.set("refresh_token", res.refreshJWT, {
            maxAge: refreshExpireIn,
            sameSite: "strict",
            path: "/",
          });
        }
      };
      res();
    }
  }, [router.asPath]);
  return (
    <>
      <div
        className={`BIG ${
          setState.setFriendRequest ||
          (setState.setModalInvite && "BIG_OVERLAY")
        }`}
      ></div>
      <Component {...pageProps} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = useCookie(context);
  if (!cookie.has("name")) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      cookie: context.req.headers.cookie || "",
      chatRoom: context.query,
    },
  };
};

export default wrapper.withRedux(MyApp);
