import { AnyAction } from 'redux';
import IInvite from 'services/redux/reducer/invites/state';
import { ActionType } from '../../types';

export const initialState: IInvite = {
  reciever: '',
  inviter: '',
  notificationNumber: 0,
};
const inviteReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.SET_RECIEVER:
      return { ...state, reciever: action.payload };
    case ActionType.SET_INVITER:
      return { ...state, inviter: action.payload };
    case ActionType.NOTIFICATION_NUMBER:
      return { ...state, notificationNumber: action.payload };
    default:
      return state;
  }
};

export default inviteReducer;
