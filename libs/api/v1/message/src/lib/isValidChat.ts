import { Chat } from '@chat-app/api/db';
import { NotFoundException } from '@nestjs/common';
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
  if (!chat) {
    throw new NotFoundException();
  }
  return true;
}
