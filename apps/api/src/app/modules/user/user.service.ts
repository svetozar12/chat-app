import { Injectable } from '@nestjs/common';

import { AuthProvider, IUser } from '@chat-app/api/shared';
import { User, Chat } from '@chat-app/api/db';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from 'passport-github';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<IUser>,
    @InjectModel(Chat.name) private chatModel: Model<Chat>
  ) {}
  async findOrCreate(profile: Profile, provider: AuthProvider): Promise<IUser> {
    const { id, displayName, photos } = profile;
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      const newUser = this.userModel.create({
        _id: id,
        provider,
        providerId: id,
        displayName,
        photos,
      });

      await this.chatModel.create({ members: [id] });

      return newUser;
    }
    // TODO Perform database lookup to extract more information about the user
    // or to create the user if the UserId is unknown to us.
    // For now, we'll skip this and always return the same dummy user, regardless of the `userId`.
    return user;
  }
}
