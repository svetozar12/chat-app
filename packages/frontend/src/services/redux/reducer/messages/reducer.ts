import { AnyAction } from 'redux';
import { ActionType } from '../../types';
import { IMessage } from './state';

const initialState: IMessage = {
  messages: [],
  show: false,
  messagePageNumber: 0,
};
const messageReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.MESSAGES:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case ActionType.PAGGINATION_MESSAGES:
      return {
        ...state,
        messages: [action.payload, ...state.messages],
      };
    case ActionType.DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter((message) => message._id !== action.payload),
      };
    case ActionType.INCREMENT_PAGE_NUMBER:
      return {
        ...state,
        messagePageNumber: ++action.payload,
      };
    case ActionType.RESET_MESSAGES:
      return initialState;
    default:
      return state;
  }
};

export default messageReducer;
// dispatch({ type: 'PAGGINATION_MESSAGES', payload: element });
