import { HYDRATE } from "next-redux-wrapper";
import { IAuthState } from "./state";
import { ActionType } from "../../types";
export const initialState: IAuthState = {
  remember_me: false,
  good: "", //good and bad stand for good alert and bad alert
  bad: "",
  loginPrompt: false,
  cookie: {
    username: "",
    id: "",
    token: "",
    refresh_token: "",
  },
};
const reducer = (state = initialState, action: any) => {
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
    case ActionType.REMEMBER_ME_CHECK:
      return { ...state, remember_me: action.payload };
    case ActionType.QUICK_LOGIN:
      return { ...state, loginPrompt: action.payload };
    case ActionType.SIGN_IN:
      return { ...state, cookie: action.payload };
    default:
      return state;
  }
};

export default reducer;
export { initialState as AuthState };
