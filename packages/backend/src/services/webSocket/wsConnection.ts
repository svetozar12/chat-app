import { createServer } from 'http';
import { Socket, Server } from 'socket.io';
import { externalUrlsEnv, portsEnv } from '../../config/env';
// handlers
import ChatHandler from './handlers/chat';
import InviteHandler from './handlers/invite';
import MessageHandler from './handlers/message';

const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: externalUrlsEnv.CLIENT_URL } });
export type ioType = typeof io;
const onConnection = (socket: Socket) => {
  MessageHandler(io, socket);
  ChatHandler(io, socket);
  InviteHandler(io, socket);
};

io.on('connection', onConnection);
if (process.env.NODE_ENV !== 'test') {
  httpServer.listen(portsEnv.WS_PORT);
}
export default io;
