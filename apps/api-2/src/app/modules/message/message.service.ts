import { Message } from '@chat-app/api/db';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>
  ) {}
  async findAll(user_id: string): Promise<Message[]> {
    const messages = await this.messageModel
      .find({
        $where: () => {
          user_id;
        },
      })
      .exec();
    return messages;
  }

  async createMessage(body: MessageDto): Promise<Message> {
    const message = await this.messageModel.create(body);
    return message;
  }

  async updateMessage(id: string, messageBody: MessageDto): Promise<Message> {
    const message = await this.messageModel.findByIdAndUpdate(id, messageBody);
    return message;
  }

  async DeleteMessage(id: string, user_id: string): Promise<Message> {
    const message = await this.messageModel.findByIdAndDelete(id, {
      user_id,
    });
    return message;
  }
}
