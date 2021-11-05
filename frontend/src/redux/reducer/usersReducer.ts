import { Action } from "../state";

const initialState = "";
const reducer = (state: any = initialState, action: Action) => {
  switch (action.type) {
    case "LOGIN_POST":
      return { ...state, payload: action.payload };
    case "LOGIN_POST_ERROR":
      return { ...state, payload: action.payload };
    case "REGISTER_POST":
      return { ...state, good: action.good };
    case "REGISTER_POST_ERROR":
      return { ...state, bad: action.bad };
    default:
      return state;
  }
};

export default reducer;
