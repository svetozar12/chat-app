import { Action } from "../state";
import { ActionType } from "../state";
import { InitialState } from "../state";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  remember_me: false,
  input_username: "",
  input_password: "",
  good: "", //good and bad stand for good alert and bad alert
  bad: "",
  loginPrompt: false,
  cookie: "",
};
const reducer = (state: InitialState = initialState, action: Action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };
    case ActionType.LOGIN_POST:
      return { ...state, state };
    case ActionType.LOGIN_POST_ERROR:
      return { ...state, bad: action.bad };
    case ActionType.REGISTER_POST:
      return { ...state, good: action.good };
    case ActionType.REGISTER_POST_ERROR:
      return { ...state, bad: action.bad };
    case ActionType.SAVE_INPUT_USERNAME:
      return { ...state, input_username: action.payload };
    case ActionType.SAVE_INPUT_PASSWORD:
      return { ...state, input_password: action.payload };
    case ActionType.REMEMBER_ME_CHECK:
      return { ...state, remember_me: action.payload };
    case ActionType.QUICK_LOGIN:
      return { ...state, loginPrompt: action.payload };
    case ActionType.SIGN_IN:
      return { ...state, cookie: action.payload };
    case ActionType.SIGN_OUT:
      return { state: undefined };
    default:
      return state;
  }
};

export default reducer;
export { initialState as AuthState };
