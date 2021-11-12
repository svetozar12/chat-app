import { Action, ActionType } from "../state";
import { HYDRATE } from "next-redux-wrapper";
const initialState = {
  sender: "",
  message: "",
};
const messageReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };
    case ActionType.MESSAGE_SEND:
      return {
        ...state,
        sender: action.payload.sender,
        message: action.payload.message,
      };
    default:
      return state;
  }
};

export default messageReducer;
