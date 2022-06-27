import React from "react";
import RegisterForm from "../components/RegisterForm";
// services
import ISave_inputState from "../services/redux/reducer/save_inputReducer/state";
import api_helper from "../services/graphql/api_helper";
// utils
import { isAlreadyAuth } from "../utils/auth";
import generic from "../utils/generic";
// hooks
import { useCookie } from "next-cookie";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

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

        const cookies = [
          { name: "name", value: state.input_username, options: { sameSite: "strict", path: "/" } },
          { name: "id", value: res.user_id, options: { sameSite: "strict", path: "/" } },
          { name: "token", value: res.Access_token, options: { sameSite: "strict", path: "/" } },
          { name: "refresh_token", value: res.Refresh_token, options: { sameSite: "strict", path: "/" } },
        ];

        cookies.forEach((element) => {
          const { name, value, options } = element;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          cookie.set(name, value, { ...options });
        });

        const chatInstance: any = await generic.getFirstChat(cookie.get("id"), cookie.get("token"));

        router.push(`/${chatInstance}`);
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
