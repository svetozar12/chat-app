import { AnyAction } from 'redux';
import { IAlert } from 'services/redux/reducer/alert/state';
import { ActionType } from '../../types';

const initialState: IAlert = {
  message: '',
  type: 'info',
};

const alertReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.SET_ALERT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default alertReducer;
