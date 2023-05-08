import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema, Message, MessageSchema } from '@chat-app/api/db';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Chat.name, schema: ChatSchema },
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
