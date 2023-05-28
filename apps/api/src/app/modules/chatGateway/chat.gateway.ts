import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ISendMessage, MESSAGE_EVENT } from '@chat-app/common/constants';

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
}
