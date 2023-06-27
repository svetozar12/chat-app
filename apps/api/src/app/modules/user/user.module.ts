import { Module } from '@nestjs/common';

import { UsersService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { User, UserSchema } from '../../utils/mongo';

@Module({
  imports: [
    CacheModule.register(),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}
