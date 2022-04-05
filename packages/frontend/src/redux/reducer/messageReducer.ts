import { Action, ActionType } from "../state";
const initialState = {
  sender: "",
  message: "",
};
const messageReducer = (state = initialState, action: Action) => {
  switch (action.type) {
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
