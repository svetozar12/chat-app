import { Dispatch } from "react";
import { ActionType } from "../types";
import axios from "axios";
import { requestUrl } from "../../utils/hostUrl_requestUrl";
import { AnyAction } from "redux";

const loginPostError = (res: string) => {
  return {
    type: ActionType.LOGIN_POST_ERROR,
    bad: res,
  };
};

const RegisterPostSuccess = (res: string) => {
  return {
    type: ActionType.REGISTER_POST,
    good: res,
  };
};

const RegisterPostError = (res: string) => {
  return {
    type: ActionType.REGISTER_POST_ERROR,
    bad: res,
  };
};

// =========
// MAIN action creators
// =========

export const loginPost = (username: string, password: string) => async (dispatch: Dispatch<AnyAction | any>) => {
  try {
    await axios.post(`${requestUrl}/auth/login`, {
      username,
      password,
    });
    return true;
  } catch (error: any) {
    username = "";
    password = "";
    dispatch(loginPostError(error.response.data.ErrorMsg));
    setTimeout(() => {
      dispatch(loginPostError(""));
    }, 4000);
    return false;
  }
};

export const registerPost =
  (username: string, password: string, email: string, gender: string) => async (dispatch: Dispatch<AnyAction | any>) => {
    try {
      const res = await axios.post(`${requestUrl}/users/register`, {
        username,
        password,
        email,
        gender,
      });
      const data = res.data.message;

      dispatch(RegisterPostSuccess(data));
      setTimeout(() => {
        dispatch(RegisterPostSuccess(""));
      }, 4000);
      return true;
    } catch (error: any) {
      const data = error.response.data.message;
      dispatch(RegisterPostError(data));
      setTimeout(() => {
        dispatch(RegisterPostError(""));
      }, 4000);
      return false;
    }
  };
