import { Socket } from 'socket.io';
import { ioType } from '../wsConnection';

const ErrorHandler = (io: ioType, socket: Socket) => {
  const errorMessageLog = (err: any) => {
    console.log(`connect_error due to ${err.message}`);
  };

  socket.on('join_chat', errorMessageLog);
};

export default ErrorHandler;
