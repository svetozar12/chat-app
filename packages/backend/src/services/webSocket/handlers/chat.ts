import { Socket } from 'socket.io';
import { ioType } from '../wsConnection';

const ChatHandler = (io: ioType, socket: Socket) => {
  const joinChat = async ({ rooms }: any) => {
    console.log(rooms, 'pereka');

    socket.join(rooms);
  };

  socket.on('join_chat', joinChat);
};

export default ChatHandler;
