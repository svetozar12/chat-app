import { Action, ActionType } from "../state";
export const initialState = {
  messages: [],
  show: false,
};
const messageReducer = (state = initialState, action: Action) => {
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
        messages: state.messages.filter((message) => message._id != action.payload),
      };
    default:
      return state;
  }
};

export default messageReducer;
