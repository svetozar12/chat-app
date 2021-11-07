import { Action } from "../state";
import { ActionType } from "../state";

const initialState = {
  remember_me: false,
  input: "",
  bad: "", //good and bad stand for good alert and bad alert
  good: "",
  payload: "",
};
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
    case ActionType.SAVE_INPUT:
      return { ...state, input: action.payload };
    case ActionType.REMEMBER_ME_CHECK:
      return { ...state, remember_me: action.payload };

    default:
      return state;
  }
};

export default reducer;
