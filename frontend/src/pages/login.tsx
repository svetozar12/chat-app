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
    if (state.input) {
      const login = await loginPost(state.input);
      if (login) {
        cookie.set("name", state.input, {
          maxAge: state.remember_me ? 94670777 : 3600,
          sameSite: "strict",
          path: "/",
        });
        router.push(`/${cookie.get("name")}`);
        dispatch({ type: "SAVE_INPUT", payload: "" });
      }
    }
  };

  return <LoginForm handleSubmit={handleSubmit} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = useCookie(context);
  const cookieName = cookie.get("name");

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
};

export default login;
