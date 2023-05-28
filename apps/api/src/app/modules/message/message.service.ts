import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/createMessage.dto';
import { Message } from '@chat-app/api/db';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>
  ) {}
  async findAll(): Promise<Message[]> {
    const messages = await this.messageModel.find();
    if (messages.length === 0) {
      throw new NotFoundException();
    }
    return messages;
  }

  async createMessage(body: CreateMessageDto): Promise<Message> {
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
