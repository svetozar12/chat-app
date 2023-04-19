import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { PrismaService } from './prisma/prisma.service';
import { Message } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}
  async findAll(userId: string): Promise<Message[]> {
    const messages = await this.prisma.message.findMany({
      where: {
        userId,
      },
    });
    return messages;
  }

  async createMessage(body: MessageDto): Promise<Message> {
    const message = await this.prisma.message.create({ data: { ...body } });
    return message;
  }

  async updateMessage(id: string, messageBody: MessageDto): Promise<Message> {
    const message = await this.prisma.message.update({
      where: { id },
      data: messageBody,
    });
    return message;
  }

  async DeleteMessage(id: string, userId: string): Promise<Message> {
    const message = await this.prisma.message.findFirst({
      where: {
        id,
        userId,
      },
      include: {},
    });
    await this.prisma.message.delete({
      where: {
        ...message,
      },
    });
    return message;
  }
}
