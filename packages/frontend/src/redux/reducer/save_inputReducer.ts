import { Action, ActionType } from "../state";
import { InitialState3 } from "../state";
import { HYDRATE } from "next-redux-wrapper";
const initialState = {
  input_username: "",
  input_password: "",
  input_email: "",
  input_gender: "",
};
const saveInputReducer = (
  state: InitialState3 = initialState,
  action: Action,
) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };
    case ActionType.SAVE_INPUT_USERNAME:
      return { ...state, input_username: action.payload };
    case ActionType.SAVE_INPUT_PASSWORD:
      return { ...state, input_password: action.payload };
    case ActionType.SAVE_INPUT_EMAIL:
      return { ...state, input_email: action.payload };
    case ActionType.SAVE_INPUT_GENDER:
      return { ...state, input_gender: action.payload };
    default:
      return state;
  }
};

export default saveInputReducer;
