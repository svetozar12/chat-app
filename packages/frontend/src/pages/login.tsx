import React from "react";
import LoginForm from "../components/LoginForm";
import { InitialState } from "../redux/state";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";
import { AppProps } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from "../redux/store";
import { wrapper } from "../redux/store";
import { loginAuth } from "../utils/authRoutes";
import { checkJWT } from "../utils/authRoutes";

function login(props: AppProps) {
  const router = useRouter();
  const cookie = useCookie(props.cookie);
  const dispatch = useDispatch();
  const { loginPost } = bindActionCreators(actions, dispatch);
  const state = useSelector(
    (state: { authReducer: InitialState }) => state.authReducer,
  );

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (state.input_username) {
      const JWT = await loginAuth(state.input_username, state.input_password);
      const login = await loginPost(state.input_username, state.input_password);
      if (await login) {
        cookie.set("name", state.input_username, {
          maxAge: state.remember_me ? 94670777 : 3600,
          sameSite: "strict",
          path: "/",
        });

        cookie.set("token", JWT, {
          maxAge: state.remember_me ? 94670777 : 3600,
          sameSite: "strict",
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
    const cookieName = cookie.get("name");
    const user = await checkJWT(cookie.get("token"));

    if (user) {
      return {
        redirect: {
          destination: `/${user}`,
          permanent: false,
        },
      };
    }
    if (cookieName) {
      return {
        redirect: {
          destination: `/${cookieName}`,
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
