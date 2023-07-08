import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import {
  ISendJoin,
  ISendMessage,
  ISendTyping,
  MESSAGE_EVENT,
  TYPING_EVENT,
  USER_STATUS_EVENT,
} from '@chat-app/shared/common-constants';
import { IUser } from '@chat-app/api/v1/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Status, User } from '../../utils/mongo';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  constructor(@InjectModel(User.name) private userModel: Model<IUser>) {}
  @WebSocketServer()
  server: Socket;
  connectedUsers: IUser[] = [];
  async handleConnection(client: Socket) {
    const {
      handshake: {
        query: { userId },
      },
    } = client;
    const user = await this.userModel.findById(userId).lean();

    this.connectedUsers.push(user);
    await this.updateUserStatus(user._id, Status.ONLINE);
    const alreadyConnectedUsers = {};
    this.connectedUsers.forEach((user) => {
      alreadyConnectedUsers[user._id] = Status.ONLINE;
    });
    this.server.emit(USER_STATUS_EVENT, alreadyConnectedUsers);
  }
  async handleDisconnect(client: Socket) {
    const {
      handshake: {
        query: { userId },
      },
    } = client;
    const disconnectedUser = this.connectedUsers.find(
      (u) => u._id.toString() === userId
    );
    if (disconnectedUser) {
      this.connectedUsers = this.connectedUsers.filter(
        (u) => u._id.toString() !== userId
      );
      await this.updateUserStatus(disconnectedUser._id, Status.OFFLINE);
      this.server.emit(USER_STATUS_EVENT, {
        [disconnectedUser._id]: Status.OFFLINE,
      });
    }
  }

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

  private async updateUserStatus(userId: string, status: string) {
    // Update user status in MongoDB
    await this.userModel.updateOne(
      { _id: userId },
      { status, lastSeen: new Date() }
    );

    // Emit user status event to all connected clients
    this.server.emit(USER_STATUS_EVENT, { userId, status });
  }
}
