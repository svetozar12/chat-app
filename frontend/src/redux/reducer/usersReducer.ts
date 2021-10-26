import { ActionType } from "../action-types";

interface LoginPost {
  type: ActionType.LOGIN_POST | ActionType.REGISTER_POST;
  payload: string;
}

interface errLoginPost {
  type: ActionType.LOGIN_POST_ERROR | ActionType.REGISTER_POST_ERROR;
  payload: string;
}

export type Action = LoginPost | errLoginPost;

const initialState = "";
const reducer = (state: string = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.LOGIN_POST:
      return action.payload;
    case ActionType.LOGIN_POST_ERROR:
      return action.payload;
    case ActionType.REGISTER_POST:
      return action.payload;
    case ActionType.REGISTER_POST_ERROR:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
