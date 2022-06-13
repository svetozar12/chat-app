import React from "react";
import RegisterForm from "../components/RegisterForm";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getFirstChat } from "../utils/getFirstChat";
// services
import ISave_inputState from "../services/redux/reducer/save_inputReducer/state";
import api_helper from "../services/graphql/api_helper";
// hooks

function Register(props: { cookie: string }) {
  const router = useRouter();
  const cookie = useCookie(props.cookie);
  const dispatch = useDispatch();
  const state = useSelector((state: { saveInputReducer: ISave_inputState }) => state.saveInputReducer);

  const quickLogin = async () => {
    try {
      const res = await api_helper.auth.login(state.input_username, state.input_password);
      if (res) {
        dispatch({ type: "QUICK_LOGIN", payload: true });
        dispatch({
          type: "SET_IS_LOADING",
          payload: true,
        });

        cookie.set("name", state.input_username, {
          sameSite: "strict",
          path: "/",
        });

        cookie.set("id", res.user_id, {
          sameSite: "strict",
          path: "/",
        });

        cookie.set("token", res.Access_token, {
          sameSite: "strict",
          path: "/",
        });

        cookie.set("refresh_token", res.Refresh_token, {
          sameSite: "strict",
          path: "/",
        });

        const chatInstance: any = await getFirstChat(cookie.get("id"), cookie.get("token"));
        console.log(chatInstance, "LOGIN");

        cookie.set("first_chat_id", chatInstance._id, {
          sameSite: "strict",
          path: "/",
        });

        cookie.set("last_visited_chatRoom", chatInstance._id, {
          sameSite: "strict",
          path: "/",
        });

        router.push(`/${chatInstance._id}`);
        dispatch({ type: "SAVE_INPUT_USERNAME", payload: "" });
        dispatch({ type: "SAVE_INPUT_PASSWORD", payload: "" });
        dispatch({ type: "SAVE_INPUT_EMAIL", payload: "" });
        dispatch({ type: "SAVE_INPUT_GENDER", payload: "" });
      }
      return;
    } catch (error) {
      dispatch({
        type: "SET_IS_LOADING",
        payload: false,
      });
      console.log(error);
      return false;
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const register = await api_helper.user.create(state.input_username, state.input_email, state.input_password, state.input_gender);

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
