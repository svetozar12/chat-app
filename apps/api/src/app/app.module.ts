import { Module } from '@nestjs/common';
import { MessageModule } from './modules/message/message.module';
import { MongooseModule } from '@nestjs/mongoose';
import { API_ENVS } from '@chat-app/api/env';
import { ChatModule } from './modules/chat/chat.module';

const { MONGO_URL } = API_ENVS;

@Module({
  imports: [MessageModule, MongooseModule.forRoot(MONGO_URL), ChatModule],
})
export class AppModule {}
