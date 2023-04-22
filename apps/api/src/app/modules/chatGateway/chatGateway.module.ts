import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { Chat, ChatSchema } from '@chat-app/api/db';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
  ],
  providers: [ChatGateway],
})
export class ChatGatewayModule {}
