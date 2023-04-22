import { Chat } from '@chat-app/api/db';
import { InjectModel } from '@nestjs/mongoose';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}
  @WebSocketServer()
  server;

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket
  ): void {
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
      client.to(chatInstance).emit('message', {
        messages,
      });
    };

    client.on('message', senMessage);
  }
}
