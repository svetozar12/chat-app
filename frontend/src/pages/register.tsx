import React from "react";
import RegisterForm from "../components/RegisterForm";
import { InitialState } from "../redux/state";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from "../redux/store";

function register(props: { cookie: string }) {
  const router = useRouter();
  const cookie = useCookie(props.cookie);
  const dispatch = useDispatch();
  const { registerPost } = bindActionCreators(actions, dispatch);
  const state = useSelector(
    (state: { authReducer: InitialState }) => state.authReducer,
  );

  React.useEffect(() => {
    if (cookie.get("name")) {
      router.push(`/${cookie.get("name")}`);
    }
  }, []);

  const quickLogin = () => {
    cookie.set("name", state.input, {
      maxAge: 1000000,
    });
    dispatch({ type: "SIGN_IN", payload: cookie.get("name") });
    router.push(`/${cookie.get("name")}`);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const register = await registerPost(state.input);
    if (await register) {
      dispatch({ type: "QUICK_LOGIN", payload: true });
    } else {
      dispatch({ type: "SAVE_INPUT", payload: "" });
    }
  };

  return <RegisterForm quickLogin={quickLogin} handleSubmit={handleSubmit} />;
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
    props: { cookie: context.req.headers.cookie || "" },
  };
};

export default register;
