import { Action, ActionType } from "../state";
import { InitialState2 } from "../state";
import { HYDRATE } from "next-redux-wrapper";
export const initialState = {
  reciever: "",
  pageNumber: 2,
  setUserSettings: false,
  setFriendRequest: false,
  toggleCreateGroup: false,
};
const homePageReducer = (
  state: InitialState2 = initialState,
  action: Action,
) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };
    case ActionType.SET_RECIEVER:
      return { ...state, reciever: action.payload };
    case ActionType.INCREMENT_PAGE_NUMBER:
      return { ...state, pageNumber: ++action.payload };
    case ActionType.SET_FRIEND_REQUEST:
      return { ...state, setFriendRequest: action.payload };
    case ActionType.SET_USER_SETTINGS:
      return { ...state, setUserSettings: action.payload };
    case ActionType.TOGGLE_CREATE_GROUP:
      return { ...state, toggleCreateGroup: action.payload };
    default:
      return state;
  }
};

export default homePageReducer;
