import { Dispatch } from "redux";
import { Action } from "../state";
import { ActionType } from "../state";
import axios from "axios";

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

export const loginPost =
  (name: string) => async (dispatch: Dispatch<Action>) => {
    try {
      const res = await axios.get(`http://localhost:4001/users/${name}`);
      return true;
    } catch (error: any) {
      dispatch(loginPostError(error.response.data.message));
      setTimeout(() => {
        dispatch(loginPostError(""));
      }, 2000);
      return false;
    }
  };

export const registerPost =
  (name: string) => async (dispatch: Dispatch<Action>) => {
    try {
      const res = await axios.post("http://localhost:4001/users/register", {
        username: name,
      });
      const data = res.data.message;

      dispatch(RegisterPostSuccess(data));
      setTimeout(() => {
        dispatch(RegisterPostSuccess(""));
      }, 2000);
      return true;
    } catch (error: any) {
      const data = error.response.data.message;

      dispatch(RegisterPostError(data));
      setTimeout(() => {
        dispatch(RegisterPostError(""));
      }, 2000);
      return false;
    }
  };
