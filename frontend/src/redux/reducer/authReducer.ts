import { Action } from "../state";
import { ActionType } from "../state";

const initialState = "";
const reducer = (state: any = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.LOGIN_POST:
      return { ...state, payload: action.payload };
    case ActionType.LOGIN_POST_ERROR:
      return { ...state, bad: action.bad };
    case ActionType.REGISTER_POST:
      return { ...state, good: action.good };
    case ActionType.REGISTER_POST_ERROR:
      return { ...state, bad: action.bad };
    default:
      return state;
  }
};

export default reducer;
