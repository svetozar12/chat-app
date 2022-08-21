import { HYDRATE } from 'next-redux-wrapper';
import { IAuth } from './state';
import { ActionType } from '../../types';

export const initialState: IAuth = {
  remember_me: false,
  good: '', // good and bad stand for good alert and bad alert
  bad: '',
  ws: null,
  loginPrompt: false,
};
const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.LOGIN_POST:
      return { ...state, state };
    case ActionType.LOGIN_POST_ERROR:
      return { ...state, bad: action.bad };
    case ActionType.REGISTER_POST:
      return { ...state, good: action.good };
    case ActionType.REGISTER_POST_ERROR:
      return { ...state, bad: action.bad };
    case ActionType.REMEMBER_ME_CHECK:
      return { ...state, remember_me: action.payload };
    case ActionType.QUICK_LOGIN:
      return { ...state, loginPrompt: action.payload };
    case ActionType.SIGN_IN:
      return { ...state, cookie: action.payload };
    default:
      return state;
  }
};

export default authReducer;
