import React from "react";
import RegisterForm from "../components/RegisterForm";
import ISave_inputState from "../redux/reducer/save_inputReducer/state";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loginAuth } from "../utils/authRoutes";
import { getFirstChat } from "../utils/getFirstChat";
import api_helper from "../graphql/api_helper";

function Register(props: { cookie: string }) {
  const [isLogging, setIsLogging] = React.useState(false);
  const router = useRouter();
  const cookie = useCookie(props.cookie);
  const dispatch = useDispatch();
  const state = useSelector((state: { saveInputReducer: ISave_inputState }) => state.saveInputReducer);

  const quickLogin = async () => {
    setIsLogging(true);
    const JWT = await loginAuth(state.input_username, state.input_password);
    cookie.set("name", state.input_username, {
      sameSite: "strict",
      path: "/",
    });
    cookie.set("token", JWT, {
      sameSite: "strict",
      path: "/",
    });
    const chatInstance: any = await getFirstChat(cookie.get("id"), cookie.get("token"));
    cookie.set("first_chat_id", chatInstance._id, {
      sameSite: "strict",
      path: "/",
    });
    cookie.set("refresh_token", JWT, {
      sameSite: "strict",
      path: "/",
      maxAge: 7200,
    });
    const cookieObj = {
      id: cookie.get("id"),
      token: cookie.get("token"),
      refresh_token: cookie.get("refresh_token"),
    };
    dispatch({ type: "SIGN_IN", payload: cookieObj });
    router.push(`/${chatInstance._id}`);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const register = await api_helper.user.create(state.input_username, state.input_email, state.input_password, state.input_gender);
    if (await register) {
      dispatch({ type: "QUICK_LOGIN", payload: true });
      dispatch({ type: "SAVE_INPUT_USERNAME", payload: "" });
      dispatch({ type: "SAVE_INPUT_PASSWORD", payload: "" });
      dispatch({ type: "SAVE_INPUT_EMAIL", payload: "" });
      dispatch({ type: "SAVE_INPUT_GENDER", payload: "" });
    } else {
      dispatch({ type: "SAVE_INPUT_USERNAME", payload: "" });
      dispatch({ type: "SAVE_INPUT_PASSWORD", payload: "" });
      dispatch({ type: "SAVE_INPUT_EMAIL", payload: "" });
      dispatch({ type: "SAVE_INPUT_GENDER", payload: "" });
    }
  };

  return <RegisterForm isLogging={isLogging} quickLogin={quickLogin} handleSubmit={handleSubmit} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cookie = useCookie(context);
  const chatInstance: any = await getFirstChat(cookie.get("id"), cookie.get("token"));

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
