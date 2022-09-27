import React from "react";
import { GetServerSideProps } from "next";
import { useCookie } from "next-cookie";
import { AppProps } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../components/LoginForm";
// utils
import { getFirstChat } from "../utils/getFirstChat";
// services
import ISave_inputState from "../services/redux/reducer/save_inputReducer/state";
import { IAuthState } from "../services/redux/reducer/authReducer/state";
import api_helper from "../services/graphql/api_helper";
import withAuthSync, { isAlreadyAuth } from "../utils/auth";
import redirectTo from "../utils/routing";
import protected_routes from "../constants/routes";
// hooks

function Login(props: AppProps) {
  const router = useRouter();
  const cookie = useCookie(props.cookie);
  const dispatch = useDispatch();
  const state = useSelector((state: { saveInputReducer: ISave_inputState }) => state.saveInputReducer);
  const authState = useSelector((state: { authReducer: IAuthState }) => state.authReducer);
  const rememberMe = authState.remember_me ? 31556952 : 3600;
  const refreshRememberMe = authState.remember_me ? 63113904 : 7200;
  cookie.set("ivan", "vankov");
  console.log(typeof window !== "undefined" && document.cookie);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (!state.input_username) {
        dispatch({ type: "LOGIN_POST_ERROR", bad: "Input cannot be empty" });
        setTimeout(() => {
          dispatch({ type: "LOGIN_POST_ERROR", bad: "" });
        }, 4000);
        return;
      }
      if (state.input_username) {
        const login = await api_helper.auth.login(state.input_username, state.input_password);

        if (login instanceof Error) return dispatch({ type: "LOGIN_POST_ERROR", bad: login.message });

        if (login) {
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

          cookie.set("first_chat_id", chatInstance, {
            sameSite: "strict",
            maxAge: rememberMe,
            path: "/",
          });

          cookie.set("last_visited_chatRoom", chatInstance, {
            sameSite: "strict",
            path: "/",
          });
          const REDIRECT_URL_CALLBACK: string = cookie.get("REDIRECT_URL_CALLBACK");
          console.log(REDIRECT_URL_CALLBACK);

          cookie.set("REDIRECT_URL_CALLBACK", REDIRECT_URL_CALLBACK || `/${chatInstance}`);
          router.push(REDIRECT_URL_CALLBACK || `/${chatInstance}`);
          dispatch({
            type: "SET_IS_LOADING",
            payload: false,
          });
          dispatch({ type: "SAVE_INPUT", payload: "" });
        }
        return;
      }
    } catch (error) {
      console.log(error);

      return error;
    }
  };

  return <LoginForm handleSubmit={handleSubmit} />;
}

export const getServerSideProps = isAlreadyAuth();

export default Login;
