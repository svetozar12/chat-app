import React from "react";
import RegisterForm from "../components/RegisterForm";
import { InitialState3 } from "../redux/state";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from "../redux/store";
import { loginAuth } from "../utils/authRoutes";
import { getFirstChat } from "../utils/getFirstChat";

function Register(props: { cookie: string }) {
  const router = useRouter();
  const cookie = useCookie(props.cookie);
  const dispatch = useDispatch();
  const { registerPost } = bindActionCreators(actions, dispatch);
  const state = useSelector((state: { saveInputReducer: InitialState3 }) => state.saveInputReducer);

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
    const chatInstance: any = await getFirstChat(cookie.get("name"));
    cookie.set("first_chat_id", chatInstance._id, {
      sameSite: "strict",
      path: "/",
    });
    cookie.set("refresh_token", JWT, {
      sameSite: "strict",
      path: "/",
      maxAge: 7200,
    });

    dispatch({ type: "SIGN_IN", payload: cookie.get("name") });

    router.push(`/${chatInstance._id}`);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const register = await registerPost(state.input_username, state.input_password, state.input_email, state.input_gender);
    if (await register) {
      dispatch({ type: "QUICK_LOGIN", payload: true });
    } else {
      dispatch({ type: "SAVE_INPUT_USERNAME", payload: "" });
      dispatch({ type: "SAVE_INPUT_PASSWORD", payload: "" });
      dispatch({ type: "SAVE_INPUT_EMAIL", payload: "" });
      dispatch({ type: "SAVE_INPUT_GENDER", payload: "" });
    }
  };

  return <RegisterForm quickLogin={quickLogin} handleSubmit={handleSubmit} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cookie = useCookie(context);
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
    props: { cookie: context.req.headers.cookie || "" },
  };
};

export default Register;
