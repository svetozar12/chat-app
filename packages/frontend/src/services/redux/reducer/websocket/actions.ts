import { ActionType } from 'services/redux/types';
import { Socket } from 'socket.io-client';

const setWSConnection = (WSConnection: Socket) => ({
  type: ActionType.SET_WS_CONNECTION,
  payload: WSConnection,
});

export { setWSConnection };
