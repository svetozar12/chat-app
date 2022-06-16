import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IAuthState } from "../../services/redux/reducer/authReducer/state";
import { IInitialSet } from "../../services/redux/reducer/setReducer/state";
import { useRouter } from "next/router";
import { useCookie } from "next-cookie";
import { Global } from "@emotion/react";
import Head from "next/dist/shared/lib/head";
import { css } from "@emotion/css";
import { AppProps } from "next/app";
import Loading from "../Loading";
import SessionProvider from "../../utils/SessionProvider";

const App = ({ Component, pageProps }: AppProps) => {
  const state = useSelector((state: { authReducer: IAuthState }) => state.authReducer);

  const setState = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const cookie = useCookie();

  // React.useEffect(() => {
  //   if (!cookie.get("refresh_token") && !response) {
  //     //check if both jwt and refresh token are expired
  //     cookie.remove("name");
  //     cookie.remove("token");
  //     cookie.remove("refresh_token");
  //     dispatch({ type: "SIGN_OUT" });
  //   }
  //   if (cookie.get("refresh_token") && !cookie.get("token")) {
  //     //if refresh token isnt expired but jwt is,The refresh token will refresh jwt
  //     const res = async () => {
  //       const expireIn = state.remember_me ? 31556952 : 3600;
  //       const refreshExpireIn = state.remember_me ? 63113904 : 7200;

  //       if (res) {
  //         cookie.set("name", res.name, {
  //           maxAge: expireIn,
  //           sameSite: "strict",
  //           path: "/",
  //         });
  //       }
  //     };
  //     res();
  //   }
  // }, [router.asPath]);
  const closeModals = () => {
    dispatch({
      type: "SET_FRIEND_REQUEST",
      payload: false,
    });
    dispatch({
      type: "SET_MODAL_INVITE",
      payload: false,
    });
    dispatch({
      type: "QUICK_LOGIN",
      payload: false,
    });
  };

  const Blur: boolean = setState.setFriendRequest || setState.setModalInvite || state.loginPrompt;

  return (
    <SessionProvider>
      <>
        <Global
          // @ts-ignore
          styles={{
            body: {
              margin: 0,
              padding: 0,
              userSelect: Blur ? "none" : "select",
            },
            a: {
              textDecoration: "none",
            },
          }}
        />
        <Head>
          <title>Chat what</title>
        </Head>
        <div
          className={css`
            position: absolute;
            z-index: ${Blur ? "100" : "-1"};
            width: 100vw;
            height: 100vh;
            opacity: 0.7;
            background: radial-gradient(var(--gradient-first) 10%, var(--gradient-second) 100%);
          `}
          onClick={closeModals}
        ></div>
        {setState.setIsLoading && <Loading />}
        <Component {...pageProps} />
      </>
    </SessionProvider>
  );
};

export default App;
