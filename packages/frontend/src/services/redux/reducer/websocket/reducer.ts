import { AnyAction } from 'redux';
import { IWebSocket } from 'services/redux/reducer/websocket/state';
import { ActionType } from '../../types';

const initialState: IWebSocket = {
  ws: null,
};

const wsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.SET_WS_CONNECTION:
      return { ...state, ws: action.payload };
    default:
      return state;
  }
};

export default wsReducer;
