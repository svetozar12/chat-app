import React from "react";
import { GetServerSideProps } from "next";
import { useCookie } from "next-cookie";
import { AppProps } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../services/redux/store";
import LoginForm from "../components/LoginForm";
// utils
import { getFirstChat } from "../utils/getFirstChat";
import { checkJWT } from "../utils/authRoutes";
// services
import ISave_inputState from "../services/redux/reducer/save_inputReducer/state";
import { IAuthState } from "../services/redux/reducer/authReducer/state";
import api_helper from "../services/graphql/api_helper";
// hooks

function Login(props: AppProps) {
  const router = useRouter();
  const cookie = useCookie(props.cookie);
  const dispatch = useDispatch();
  const state = useSelector((state: { saveInputReducer: ISave_inputState }) => state.saveInputReducer);
  const authState = useSelector((state: { authReducer: IAuthState }) => state.authReducer);
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
      const login = await api_helper.auth.login(state.input_username, state.input_password);
      if (await login) {
        dispatch({ type: "QUICK_LOGIN", payload: true });
        dispatch({
          type: "SET_IS_LOADING",
          payload: true,
        });

        cookie.set("name", state.input_username, {
          sameSite: "strict",
          maxAge: rememberMe,
          path: "/",
        });

        cookie.set("id", login.user_id, {
          sameSite: "strict",
          maxAge: rememberMe,
          path: "/",
        });

        cookie.set("token", login.Access_token, {
          sameSite: "strict",
          maxAge: rememberMe,
          path: "/",
        });

        cookie.set("refresh_token", login.Refresh_token, {
          sameSite: "strict",
          maxAge: refreshRememberMe,
          path: "/",
        });

        const chatInstance: any = await getFirstChat(cookie.get("id"), cookie.get("token"));
        console.log(chatInstance, "LOGIN");

        cookie.set("first_chat_id", chatInstance._id, {
          sameSite: "strict",
          maxAge: rememberMe,
          path: "/",
        });

        cookie.set("last_visited_chatRoom", chatInstance._id, {
          sameSite: "strict",
          path: "/",
        });

        router.push(`/${chatInstance._id}`);
        dispatch({
          type: "SET_IS_LOADING",
          payload: false,
        });
        dispatch({ type: "SAVE_INPUT", payload: "" });
      }
      return;
    }
  };

  return <LoginForm handleSubmit={handleSubmit} />;
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(() => async (context) => {
  const cookie = useCookie(context);
  await checkJWT(cookie.get("user_id"), cookie.get("token"));
  const chatInstance: any = await getFirstChat(cookie.get("id"), cookie.get("token"));
  if (cookie.has("name") && cookie.has("token")) {
    return {
      redirect: {
        destination: `/${chatInstance}`,
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
