import { AnyAction } from 'redux';
import { IAlert } from 'services/redux/reducer/alert/state';
import { ActionType } from '../../types';

const initialState: IAlert = {
  good: '', // good and bad stand for good alert and bad alert
  bad: '',
};

const alertReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.LOGIN_POST_ERROR:
      return { ...state, bad: action.payload };
    case ActionType.REGISTER_POST:
      return { ...state, good: action.payload };
    case ActionType.REGISTER_POST_ERROR:
      return { ...state, bad: action.payload };
    default:
      return state;
  }
};

export default alertReducer;
