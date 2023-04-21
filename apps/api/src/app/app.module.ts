import { Module } from '@nestjs/common';
import { MessageModule } from './modules/message/message.module';
import { MongooseModule } from '@nestjs/mongoose';
import { API_ENVS } from '@chat-app/api/env';
import { AuthModule } from './modules/auth/auth.module';
import { UserService } from './modules/user/user.service';
import { UserModule } from './modules/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

const { MONGO_URL } = API_ENVS;

@Module({
  imports: [
    MessageModule,
    MongooseModule.forRoot(MONGO_URL),
    AuthModule,
    UserModule,
  ],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: AuthGuard('local'),
  //   },
  // ],
})
export class AppModule {}
