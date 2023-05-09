import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/createMessage.dto';
import { Chat, Message } from '@chat-app/api/db';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isValidChat } from '@chat-app/api/v1/message';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(Chat.name) private chatModel: Model<Chat>
  ) {}
  async findAll(userId: string, chatId: string): Promise<Message[]> {
    const messages = await this.messageModel.find({
      userId,
      chatId,
    });
    if (messages.length === 0) {
      throw new NotFoundException();
    }
    return messages;
  }

  async createMessage(body: CreateMessageDto): Promise<Message> {
    const { userId, chatId } = body;
    await isValidChat(this.chatModel, userId, chatId);
    return this.messageModel.create(body);
  }

  async updateMessage(
    _id: string,
    messageBody: CreateMessageDto
  ): Promise<Message> {
    return this.messageModel.findOneAndUpdate(
      {
        _id,
      },
      messageBody
    );
  }

  async DeleteMessage(id: string, userId: string): Promise<Message> {
    const message = (await this.messageModel.find({
      where: {
        id,
        userId,
      },
      include: {},
    })) as unknown as Message;
    await this.messageModel.deleteOne({
      where: {
        ...message,
      },
    });
    return message;
  }
}
