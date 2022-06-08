import { AnyAction } from "redux";
import { ActionType } from "../../types";
import { InitialStateMessage } from "./state";
export const initialState: InitialStateMessage = {
  messages: [],
  show: false,
};
const messageReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.CLEAR:
      return initialState;
    case ActionType.MESSAGES:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case ActionType.SHOW_SETTINGS:
      return {
        ...state,
        show: action.payload,
      };
    case ActionType.PAGGINATION_MESSAGES:
      return {
        ...state,
        messages: [action.payload, ...state.messages],
      };
    case ActionType.DELETE_MESSAGE:
      return {
        ...state,
        // @ts-ignore
        messages: state.messages.filter((message) => message._id != action.payload),
      };
    case ActionType.RESET_MESSAGES:
      return initialState;
    default:
      return state;
  }
};

export default messageReducer;
