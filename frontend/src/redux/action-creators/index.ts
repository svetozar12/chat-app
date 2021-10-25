import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import axios from "axios";
import { Action } from "../reducer/usersReducer";

const loginPostSuccess = (res: any) => {
  return {
    type: ActionType.LOGIN_POST,
    payload: res,
  };
};

const loginPostError = (res: string) => {
  return {
    type: ActionType.LOGIN_POST_ERROR,
    payload: res,
  };
};

export const loginPost =
  (name: string) => async (dispatch: Dispatch<Action>) => {
    try {
      const res = await axios.get(`http://localhost:4001/users/${name}`);
      dispatch(loginPostSuccess(res));
      return true;
    } catch (error: any) {
      const data = error.response.data.message;
      dispatch(loginPostError(data));
      return false;
    }
  };
