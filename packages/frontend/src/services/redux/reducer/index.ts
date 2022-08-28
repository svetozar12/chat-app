import { AnyAction, combineReducers } from 'redux';
import authReducer from 'services/redux/reducer/auth/reducer';
import { ActionType } from '../types';
import { HYDRATE } from 'next-redux-wrapper';
import wsReducer from 'services/redux/reducer/websocket/reducer';
import messageReducer from 'services/redux/reducer/messages/reducer';

import { IAuth } from 'services/redux/reducer/auth/state';
import { IWebSocket } from 'services/redux/reducer/websocket/state';
import { IMessage } from 'services/redux/reducer/messages/state';
import IInputs from 'services/redux/reducer/inputs/state';
import inputReducer from 'services/redux/reducer/inputs/reducer';
import toggleReducer from 'services/redux/reducer/toggles/reducer';
import { IToggle } from 'services/redux/reducer/toggles/state';
import IInvite from 'services/redux/reducer/invites/state';
import inviteReducer from 'services/redux/reducer/invites/reducer';
import { IAlert } from 'services/redux/reducer/alert/state';
import alertReducer from 'services/redux/reducer/alert/reducer';

export interface STATE {
  auth: IAuth;
  ws: IWebSocket;
  messages: IMessage;
  inputs: IInputs;
  toggle: IToggle;
  invite: IInvite;
  alert: IAlert;
}

const combiReducers = combineReducers({
  auth: authReducer,
  ws: wsReducer,
  messages: messageReducer,
  inputs: inputReducer,
  toggle: toggleReducer,
  invite: inviteReducer,
  alert: alertReducer,
});

const combReducers = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE)
    return {
      ...state,
      ...action.payload,
    };
  if (action.type === ActionType.SIGN_OUT) {
    return undefined;
  }
  return combiReducers(state, action);
};

export default combReducers;
