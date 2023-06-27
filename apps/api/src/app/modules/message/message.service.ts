import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/createMessage.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { PaginationQueryDto } from '../../common/dto/queryPagination.dto';
import { formatPaginatedResponse } from '../../../utils';
import { Message } from '../../utils/mongo';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}
  async findAll({ limit, page }: PaginationQueryDto) {
    const messages = await this.messageModel
      .find()
      .sort({ createdAt: 'desc', _id: 'desc' })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    const total = await this.messageModel.find().count();
    if (messages.length === 0) {
      throw new NotFoundException();
    }
    return formatPaginatedResponse('messages', messages.reverse(), {
      limit: Number(limit),
      page: Number(page),
      total,
    });
  }

  async createMessage(body: CreateMessageDto): Promise<Message> {
    await this.cacheManager.reset();
    return this.messageModel.create(body);
  }

  async updateMessage(
    _id: string,
    messageBody: CreateMessageDto
  ): Promise<Message> {
    await this.cacheManager.reset();

    return this.messageModel.findOneAndUpdate(
      {
        _id,
      },
      messageBody
    );
  }

  async DeleteMessage(id: string, userId: string): Promise<Message> {
    await this.cacheManager.reset();

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
