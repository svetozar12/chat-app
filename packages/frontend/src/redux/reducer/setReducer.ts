import { Action, ActionType, InitialState2 } from "../state";
export const initialState = {
  reciever: "",
  chat_inviter: "",
  pageNumber: 2,
  setUserSettings: false,
  setFriendRequest: false,
  toggleCreateGroup: false,
  setMobileNav: false,
  setIsMatch: false,
  setChatSettings: false,
  setModalInvite: false,
  setIsLoggingIn: false,
};
const setReducer = (state: InitialState2 | any | InitialState2[] = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_RECIEVER:
      return { ...state, reciever: action.payload };
    case ActionType.CHAT_INVITER:
      return { ...state, chat_inviter: action.payload };
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
    case ActionType.SET_CHAT_SETTINGS:
      return { ...state, setChatSettings: action.payload };
    case ActionType.SET_IS_MATCH:
      return { ...state, setIsMatch: action.payload };
    case ActionType.SET_MODAL_INVITE:
      return { ...state, setModalInvite: action.payload };
    case ActionType.SET_IS_LOGEDIN:
      return { ...state, setIsLoggingIn: action.payload };
    case ActionType.SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};

export default setReducer;
