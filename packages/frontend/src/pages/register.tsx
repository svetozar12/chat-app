import React from "react";
import RegisterForm from "../components/RegisterForm";
import { useCookie } from "next-cookie";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getFirstChat } from "../utils/getFirstChat";
// services
import ISave_inputState from "../services/redux/reducer/save_inputReducer/state";
import api_helper from "../services/graphql/api_helper";
import { isAlreadyAuth } from "../utils/auth";
import routes from "../constants/routes";
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
        return true;
      }
      return false;
    } catch (error) {
      dispatch({
        type: "SET_IS_LOADING",
        payload: false,
      });
      console.log(error);
      return false;
    }
  };

  return <RegisterForm quickLogin={quickLogin} />;
}
export const getServerSideProps = isAlreadyAuth();
export default Register;
