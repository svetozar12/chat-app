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
    const response = checkJWT(cookie.get("token"));
    if (!cookie.get("refresh_token") && !response) {
      cookie.remove("name");
      cookie.remove("token");
      cookie.remove("refresh_token");
      dispatch({ type: "SIGN_OUT" });
    }
    console.log("expired", cookie.get("name"));
    if (cookie.get("refresh_token") && !cookie.get("token")) {
      const res = async () => {
        const res = await checkRefreshToken(cookie.get("refresh_token"));
        if (res) {
          cookie.set("name", res.name, {
            maxAge: state.remember_me ? 31556952 : 3600,
            sameSite: "strict",
            path: "/",
          });
          cookie.set("token", res.JWT, {
            maxAge: 3600,
            sameSite: "strict",
            path: "/",
          });
          cookie.set("refresh_token", res.refreshJWT, {
            maxAge: 31556952,
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
