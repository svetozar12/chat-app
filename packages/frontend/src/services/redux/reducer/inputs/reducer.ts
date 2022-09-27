import IInputs from './state';
import { ActionType } from '../../types';

export const initialState: IInputs = {
  input_username: '',
  input_password: '',
  input_email: '',
  input_gender: 'other',
  input_file: null,
  // notification_number: 0,
};
const inputReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.SAVE_INPUT_USERNAME:
      return { ...state, input_username: action.payload };
    case ActionType.SAVE_INPUT_PASSWORD:
      return { ...state, input_password: action.payload };
    case ActionType.SAVE_INPUT_EMAIL:
      return { ...state, input_email: action.payload };
    case ActionType.SAVE_INPUT_GENDER:
      return { ...state, input_gender: action.payload };
    case ActionType.SAVE_INPUT_FILE:
      return { ...state, input_file: action.payload };
    // case ActionType.NOTIFICATION_NUMBER:
    //   return { ...state, notification_number: action.payload };
    default:
      return state;
  }
};

export default inputReducer;
