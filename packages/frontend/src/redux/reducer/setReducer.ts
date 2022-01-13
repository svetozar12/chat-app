import { Action, ActionType } from "../state";
import { InitialState2 } from "../state";
import { HYDRATE } from "next-redux-wrapper";
export const initialState = {
  reciever: "",
  pageNumber: 2,
  setUserSettings: false,
  setFriendRequest: false,
  toggleCreateGroup: false,
  setMobileNav: false,
};
const setReducer = (
  state: InitialState2 | undefined = initialState,
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
    case ActionType.SET_MOBILE_NAV:
      return { ...state, setMobileNav: action.payload };
    case ActionType.SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};

export default setReducer;
