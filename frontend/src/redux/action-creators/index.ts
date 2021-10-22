import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import Action from "../actions";

export const testDispatch = (amount: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.TEST,
      payload: amount,
    });
  };
};

export const test1Dispatch = (amount: number) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.TEST1,
      payload: amount,
    });
  };
};
