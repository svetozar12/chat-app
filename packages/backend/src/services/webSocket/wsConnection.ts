import { Socket, Server } from 'socket.io';
import { externalUrlsEnv, portsEnv } from '../../config/env';
// handlers
import ChatHandler from './handlers/chat';
import ErrorHandler from './handlers/error';
import InviteHandler from './handlers/invite';
import MessageHandler from './handlers/message';

const io = new Server(parseInt(portsEnv.WS_PORT), { cors: { origin: externalUrlsEnv.CLIENT_URL } });
export type ioType = typeof io;

const onConnection = (socket: Socket) => {
  MessageHandler(io, socket);
  ChatHandler(io, socket);
  InviteHandler(io, socket);
  ErrorHandler(io, socket);
};

io.on('connection', onConnection);

export default io;
