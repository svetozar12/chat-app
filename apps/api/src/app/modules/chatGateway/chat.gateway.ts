import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import {
  ISendMessage,
  ISendTyping,
  MESSAGE_EVENT,
  TYPING_EVENT,
} from '@chat-app/shared/common-constants';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Socket;

  @SubscribeMessage(MESSAGE_EVENT)
  async sendMessage(
    @MessageBody()
    { message, userId }: ISendMessage
  ): Promise<void> {
    const date = new Date();
    const messages = [{ userId, message, createdAt: date }];
    this.server.emit(MESSAGE_EVENT, {
      messages,
    });
  }

  @SubscribeMessage(TYPING_EVENT)
  async typing(
    @MessageBody()
    { userId, isTyping }: ISendTyping
  ): Promise<void> {
    const typing = { userId, isTyping };
    this.server.emit(TYPING_EVENT, typing);
  }
}
