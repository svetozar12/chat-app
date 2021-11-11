import { Action, ActionType } from "../state";
import { InitialState2 } from "../state";
const initialState = {
  reciever: "",
  pageNumber: 2,
};
const homePageReducer = (
  state: InitialState2 = initialState,
  action: Action,
) => {
  switch (action.type) {
    case ActionType.SET_RECIEVER:
      return { ...state, reciever: action.payload };
    case ActionType.INCREMENT_PAGE_NUMBER:
      return { ...state, pageNumber: ++action.payload };
    default:
      return state;
  }
};

export default homePageReducer;
