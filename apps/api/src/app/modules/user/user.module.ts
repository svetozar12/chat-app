import { Module } from '@nestjs/common';

import { UsersService } from './user.service';
import { User, UserSchema } from '@chat-app/api/db';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
