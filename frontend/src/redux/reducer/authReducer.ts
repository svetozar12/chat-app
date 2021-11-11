import { Action } from "../state";
import { ActionType } from "../state";
import { InitialState } from "../state";

const initialState = {
  remember_me: false,
  input: "",
  good: "", //good and bad stand for good alert and bad alert
  bad: "",
  loginPrompt: false,
  cookie: "",
};
const reducer = (state: InitialState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.LOGIN_POST:
      return { ...state, state };
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
    case ActionType.QUICK_LOGIN:
      return { ...state, loginPrompt: action.payload };
    case ActionType.SIGN_IN:
      console.log(action.payload);
      return { ...state, cookie: action.payload };
    default:
      return state;
  }
};

export default reducer;
