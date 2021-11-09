import { Action, ActionType } from "../state";
import { InitialState2 } from "../state";
const initialState = {
  reciever: "",
};
const homePageReducer = (
  state: InitialState2 = initialState,
  action: Action,
) => {
  switch (action.type) {
    case ActionType.SET_RECIEVER:
      return { ...state, reciever: action.payload };
    default:
      return state;
  }
};

export default homePageReducer;
