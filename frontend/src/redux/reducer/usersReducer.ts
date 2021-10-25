import { ActionType } from "../action-types";

interface LoginPost {
  type: ActionType.LOGIN_POST;
  payload?: string;
}

interface errLoginPost {
  type: ActionType.LOGIN_POST_ERROR;
  payload?: string;
}

export type Action = LoginPost | errLoginPost;

const initialState = "";
const reducer = (state: string = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.LOGIN_POST:
      return state;
    case ActionType.LOGIN_POST_ERROR:
      return state + action.payload;
    default:
      return state;
  }
};

export default reducer;
