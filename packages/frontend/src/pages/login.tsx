import React from "react";
import { GetServerSideProps } from "next";
import { useCookie } from "next-cookie";
import { AppProps } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { InitialState } from "../redux/state";
import { actions, wrapper } from "../redux/store";
import LoginForm from "../components/LoginForm";
import { checkJWT, loginAuth, ITokens } from "../utils/authRoutes";

function login(props: AppProps) {
  const router = useRouter();
  const cookie = useCookie(props.cookie);
  const dispatch = useDispatch();
  const { loginPost } = bindActionCreators(actions, dispatch);
  const state = useSelector(
    (state: { authReducer: InitialState }) => state.authReducer,
  );
  const rememberMe = state.remember_me ? 31556952 : 3600;

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (state.input_username) {
      const tokens = await loginAuth(
        state.input_username,
        state.input_password,
      );
      console.log(tokens.refreshJWT);

      const login = await loginPost(state.input_username, state.input_password);
      if (await login) {
        cookie.set("name", state.input_username, {
          sameSite: "strict",
          maxAge: rememberMe,
          path: "/",
        });

        cookie.set("token", tokens.JWT, {
          sameSite: "strict",
          maxAge: rememberMe,
          path: "/",
        });

        cookie.set("refresh_token", tokens.refreshJWT, {
          sameSite: "strict",
          maxAge: 31556952,
          path: "/",
        });

        dispatch({ type: "SIGN_IN", payload: cookie.get("name") });
        router.push(`/${cookie.get("name")}`);
        dispatch({ type: "SAVE_INPUT", payload: "" });
      }
    }
  };

  return <LoginForm handleSubmit={handleSubmit} />;
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const cookie = useCookie(context);
    const user = await checkJWT(cookie.get("token"));

    if (cookie.get("name") && user) {
      return {
        redirect: {
          destination: `/${user}`,
          permanent: false,
        },
      };
    }
    return {
      props: {
        cookie: context.req.headers.cookie || "",
      },
    };
  });

export default login;
