import { HYDRATE } from 'next-redux-wrapper';
import { IAuth } from './state';
import { ActionType } from '../../types';

export const initialState: IAuth = {
  remember_me: false,
  loginPrompt: false,
};
const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.REMEMBER_ME_CHECK:
      return { ...state, remember_me: action.payload };
    case ActionType.SIGN_IN:
      return { ...state, cookie: action.payload };
    default:
      return state;
  }
};

export default authReducer;
