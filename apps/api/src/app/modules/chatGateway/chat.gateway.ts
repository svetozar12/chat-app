import { Chat } from '@chat-app/api/db';
import { InjectModel } from '@nestjs/mongoose';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import mongoose, { Model } from 'mongoose';
import { Socket } from 'socket.io';
import { MESSAGE } from '@chat-app/common/constants';

export interface ISendMessage {
  chatInstance: string;
  message: string;
  sender: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}
  @WebSocketServer()
  server: Socket;

  @SubscribeMessage(MESSAGE)
  async sendMessage(
    @MessageBody()
    { chatInstance, message, sender }: ISendMessage
  ): Promise<void> {
    const findChat = await this.chatModel
      .findOne({ _id: new mongoose.Types.ObjectId(chatInstance) })
      .select('members')
      .exec();
    if (!findChat) return null;
    const date = new Date();
    const messages = [{ sender, message, createdAt: date }];
    this.server.to(chatInstance).emit(MESSAGE, {
      messages,
    });
  }
}
