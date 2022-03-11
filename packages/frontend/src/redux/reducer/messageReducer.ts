import { Action, ActionType } from "../state";
export const initialState = {
  sender: "",
  message: "",
  messages: [],
};
const messageReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.MESSAGE_SEND:
      return {
        ...state,
        sender: action.payload.sender,
        message: action.payload.message,
      };
    case ActionType.CLEAR:
      return initialState;
    case ActionType.MESSAGES:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case ActionType.PAGGINATION_MESSAGES:
      return {
        ...state,
        messages: [action.payload, ...state.messages],
      };
    case ActionType.DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter((message) => message._id != action.payload),
      };
    default:
      return state;
  }
};

export default messageReducer;
