import { Chat } from '@chat-app/api/db';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';

export async function isValidChat(
  chatModel: Model<Chat>,
  userId: string,
  chatId: Types.ObjectId
): Promise<boolean> {
  const chat = await chatModel.findOne({
    chatId,
    userId,
  });
  // if (!chat) {
  //   throw new HttpException('Chat Not Found', HttpStatus.NOT_FOUND);
  // }
  return true;
}
