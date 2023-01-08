import { Socket } from 'socket.io';
import Chats from '../../../models/chatRoom.model';
import { ioType } from '../wsConnection';

const MessageHandler = (io: ioType, socket: Socket) => {
  const senMessage = async ({ chatInstance, sender, message }: { chatInstance: string; sender: string; message: string }) => {
    const findChat = await Chats.findOne({ _id: chatInstance }).select('members').exec();
    if (!findChat) return null;
    const date = new Date();
    const messages = [{ sender, message, createdAt: date }];

    socket.to(chatInstance).emit('message', {
      messages,
    });
    // io.to(chatInstance).emit('message', {
    //   messages,
    // });
  };

  socket.on('message', senMessage);
};

export default MessageHandler;
