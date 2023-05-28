import { Module } from '@nestjs/common';
import { MessageModule } from './modules/message/message.module';
import { MongooseModule } from '@nestjs/mongoose';
import { API_ENVS } from '@chat-app/api/env';
import { ChatGatewayModule } from './modules/chatGateway/chatGateway.module';
import { GithubOauthModule } from './modules/auth/github/github.module';
import { UsersModule } from './modules/user/user.module';
import { JwtAuthModule } from './modules/auth/jwt/jwt-auth.module';
import { CacheModule } from '@nestjs/cache-manager';

const { MONGO_URL } = API_ENVS;

@Module({
  imports: [
    MessageModule,
    MongooseModule.forRoot(MONGO_URL),
    ChatGatewayModule,
    GithubOauthModule,
    UsersModule,
    JwtAuthModule,
  ],
})
export class AppModule {}
