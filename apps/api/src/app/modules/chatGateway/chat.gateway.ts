import { Chat } from '@chat-app/api/db';
import { InjectModel } from '@nestjs/mongoose';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Socket } from 'socket.io';
import { MESSAGE } from './events';

@WebSocketGateway()
export class ChatGateway {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}
  @WebSocketServer()
  server: Socket;

  @SubscribeMessage(MESSAGE)
  handleMessage(): void {
    const senMessage = async ({
      chatInstance,
      sender,
      message,
    }: {
      chatInstance: string;
      sender: string;
      message: string;
    }) => {
      const findChat = await this.chatModel
        .findOne({ _id: chatInstance })
        .select('members')
        .exec();
      if (!findChat) return null;
      const date = new Date();
      const messages = [{ sender, message, createdAt: date }];
      this.server.to(chatInstance).emit(MESSAGE, {
        messages,
      });
    };

    this.server.on(MESSAGE, senMessage);
  }
}
