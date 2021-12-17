import React from "react";
import RegisterForm from "../components/RegisterForm";
import { InitialState } from "../redux/state";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from "../redux/store";
import { loginAuth } from "../utils/authRoutes";

function register(props: { cookie: string }) {
  const router = useRouter();
  const cookie = useCookie(props.cookie);
  const dispatch = useDispatch();
  const { registerPost } = bindActionCreators(actions, dispatch);
  const state = useSelector(
    (state: { authReducer: InitialState }) => state.authReducer,
  );

  const quickLogin = async () => {
    const JWT = await loginAuth(state.input_username, state.input_password);
    cookie.set("name", state.input_username, {
      sameSite: "strict",
      path: "/",
    });
    cookie.set("token", JWT, {
      sameSite: "strict",
      path: "/",
    });
    cookie.set("refresh_token", JWT, {
      sameSite: "strict",
      path: "/",
      maxAge: 7200,
    });
    dispatch({ type: "SIGN_IN", payload: cookie.get("name") });
    router.push(`/${cookie.get("name")}`);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const register = await registerPost(
      state.input_username,
      state.input_password,
    );
    if (await register) {
      dispatch({ type: "QUICK_LOGIN", payload: true });
    } else {
      dispatch({ type: "SAVE_INPUT_USERNAME", payload: "" });
      dispatch({ type: "SAVE_INPUT_PASSWORD", payload: "" });
    }
  };

  return <RegisterForm quickLogin={quickLogin} handleSubmit={handleSubmit} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = useCookie(context);

  if (cookie.has("name") && cookie.has("token")) {
    return {
      redirect: {
        destination: `/${cookie.get("name")}`,
        permanent: false,
      },
    };
  }

  return {
    props: { cookie: context.req.headers.cookie || "" },
  };
};

export default register;
