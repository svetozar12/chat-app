import { ActionType } from "../action-types";
import Action from "../actions";
const initial = "";
const reducer = (state: string = initial, action: Action) => {
  switch (action.type) {
    case ActionType.LOGIN_POST:
      return state;
    case ActionType.LOGIN_POST_ERROR:
      return "ivan";
    default:
      return state;
  }
};

export default reducer;
