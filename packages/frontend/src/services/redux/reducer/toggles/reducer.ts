import { AnyAction } from 'redux';
import { ActionType } from '../../types';
import { IToggle } from './state';

const initialState: IToggle = {
  toggleUserSettings: false,
  toggleFriendReqModal: false,
  toggleCreateGroupModal: false,
  toggleMobileNav: false,
  toggleIsMatch: false,
  toggleChatSettings: false,
  toggleInvideModal: false,
  toggleIsLoggedIn: false,
  toggeleIsLoading: false,
  toggleQuickLogin: false,
};
const toggleReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.TOGGLE_FRIEND_REQUEST:
      return { ...state, toggleFriendReqModal: action.payload };
    case ActionType.TOGGLE_SETTINGS:
      return {
        ...state,
        show: action.payload,
      };
    case ActionType.TOGGLE_USER_SETTINGS:
      return { ...state, toggleUserSettings: action.payload };
    case ActionType.TOGGLE_QUICK_LOGIN:
      return { ...state, toggleQuickLogin: action.payload };
    case ActionType.TOGGLE_CREATE_GROUP:
      return { ...state, toggleCreateGroupModal: action.payload };
    case ActionType.TOGGLE_MOBILE_NAV:
      return { ...state, TOGGLEMobileNav: action.payload };
    case ActionType.TOGGLE_CHAT_SETINGS:
      return { ...state, toggleChatSettings: action.payload };
    case ActionType.TOGGLE_IS_MATCH:
      return { ...state, TOGGLEIsMatch: action.payload };
    case ActionType.TOGGLE_MODAL_INVITE:
      return { ...state, TOGGLEModalInvite: action.payload };
    case ActionType.TOGGLE_IS_LOGEDIN:
      return { ...state, TOGGLEIsLoggingIn: action.payload };
    case ActionType.TOGGLE_IS_LOADING:
      return { ...state, TOGGLEIsLoading: action.payload };
    default:
      return state;
  }
};

export default toggleReducer;
