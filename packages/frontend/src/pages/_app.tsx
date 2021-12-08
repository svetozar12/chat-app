import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { InitialState } from "../redux/state";
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
  const dispatch = useDispatch();
  const router = useRouter();
  const cookie = useCookie(props.cookie);
  useEffect(() => {
    const res = checkRefreshToken(cookie.get("refresh_token"));
    const response = checkJWT(cookie.get("token"));
    if (!res && !response) {
      cookie.remove("name");
      cookie.remove("token");
      cookie.remove("refresh_token");
      return dispatch({ type: "SIGN_OUT" });
    }
    if (cookie.has("refresh_token") && !response) {
      cookie.set("name", state.input_username, {
        maxAge: state.remember_me ? 31556952 : 3600,
        sameSite: "strict",
        path: "/",
      });

      cookie.set("token", res.Access_token, {
        maxAge: 3600,
        sameSite: "strict",
        path: "/",
      });

      cookie.set("refresh_token", res.Refresh_token, {
        maxAge: 31556952,
        sameSite: "strict",
        path: "/",
      });
    }
  }, [router.asPath]);
  return (
    <>
      <div className="BIG"></div>
      <Component {...pageProps} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      cookie: context.req.headers.cookie || "",
      chatRoom: context.query,
    },
  };
};

export default wrapper.withRedux(MyApp);
