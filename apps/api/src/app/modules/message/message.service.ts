import { Injectable, NotFoundException } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { Message } from '@chat-app/api/db';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name, 'Message') private messageModel: Model<Message>
  ) {}
  async findAll(userId: string): Promise<Message[]> {
    const messages = await this.messageModel.find({
      where: {
        userId,
      },
    });
    if (messages.length === 0) {
      throw new NotFoundException();
    }
    return messages;
  }

  async createMessage(body: MessageDto): Promise<Message> {
    const message = new this.messageModel({ data: body });
    await message.save();
    return message;
  }

  async updateMessage(id: string, messageBody: MessageDto): Promise<any> {
    const message = await this.messageModel.updateOne({
      where: { id },
      data: messageBody,
    });
    return message;
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
