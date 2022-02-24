import React from "react";
import { GetServerSideProps } from "next";
import { useCookie } from "next-cookie";
import { AppProps } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { InitialState, InitialState3 } from "../redux/state";
import { actions, wrapper } from "../redux/store";
import { getFirstChat } from "../utils/getFirstChat";
import LoginForm from "../components/LoginForm/LoginForm";
import { checkJWT, loginAuth } from "../utils/authRoutes";

function Login(props: AppProps) {
  const router = useRouter();
  const cookie = useCookie(props.cookie);
  const dispatch = useDispatch();
  const { loginPost } = bindActionCreators(actions, dispatch);
  const state = useSelector((state: { saveInputReducer: InitialState3 }) => state.saveInputReducer);

  const authState = useSelector((state: { authReducer: InitialState }) => state.authReducer);

  const rememberMe = authState.remember_me ? 31556952 : 3600;
  const refreshRememberMe = authState.remember_me ? 63113904 : 7200;

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!state.input_username) {
      dispatch({ type: "LOGIN_POST_ERROR", bad: "Input cannot be empty" });
      setTimeout(() => {
        dispatch({ type: "LOGIN_POST_ERROR", bad: "" });
      }, 4000);
      return;
    }
    if (state.input_username) {
      const tokens: any = await loginAuth(state.input_username, state.input_password);

      const login = await loginPost(state.input_username, state.input_password);
      if (await login) {
        cookie.set("name", state.input_username, {
          sameSite: "strict",
          maxAge: rememberMe,
          path: "/",
        });
        const chatInstance: any = await getFirstChat(cookie.get("name"));
        cookie.set("first_chat_id", chatInstance._id, {
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
          maxAge: refreshRememberMe,
          path: "/",
        });

        dispatch({ type: "SIGN_IN", payload: cookie.get("name") });
        router.push(`/${chatInstance._id}`);
        dispatch({ type: "SAVE_INPUT", payload: "" });
      }
      return;
    }
  };

  return <LoginForm handleSubmit={handleSubmit} />;
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(() => async (context) => {
  const cookie = useCookie(context);
  await checkJWT(cookie.get("token"));
  const chatInstance: any = await getFirstChat(cookie.get("name"));
  if (cookie.has("name") && cookie.has("token")) {
    return {
      redirect: {
        destination: `/${chatInstance._id}`,
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

export default Login;
