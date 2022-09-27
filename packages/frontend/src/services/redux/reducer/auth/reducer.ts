import { IAuth } from './state';
import { ActionType } from '../../types';

export const initialState: IAuth = {
  remember_me: false,
  loginPrompt: false,
  isAuth: false,
};
const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.REMEMBER_ME_CHECK:
      return { ...state, remember_me: action.payload };
    case ActionType.SIGN_IN:
      return { ...state, cookie: action.payload };
    case ActionType.IS_AUTH:
      return { ...state, isAuth: action.payload };
    default:
      return state;
  }
};

export default authReducer;
