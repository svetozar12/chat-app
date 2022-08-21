import { Socket } from 'socket.io-client';

export interface IAuth {
  remember_me: boolean;
  loginPrompt: boolean;
  good?: string;
  ws: null | Socket;
  bad?: string;
}
