import { Module } from '@nestjs/common';
import { MessageModule } from './modules/message/message.module';
import { MongooseModule } from '@nestjs/mongoose';
import { API_ENVS } from '@chat-app/api/env';
import { UserModule } from './modules/user/user.module';

const { MONGO_URL } = API_ENVS;

@Module({
  imports: [MessageModule, MongooseModule.forRoot(MONGO_URL), UserModule],
})
export class AppModule {}
