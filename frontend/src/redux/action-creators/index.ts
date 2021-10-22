import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import axios from "axios";
import Action from "../actions";

export const loginPost =
  (name: string) => async (dispatch: Dispatch<Action>) => {
    try {
      const res = await axios.get(`http://localhost:4001/users/${name}`);
      dispatch({
        type: ActionType.LOGIN_POST,
      });
      return true;
    } catch (error: any) {
      dispatch({
        type: ActionType.LOGIN_POST_ERROR,
        payload: error.response.data.message,
      });
      return false;
    }
  };
