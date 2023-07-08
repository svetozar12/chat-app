import { AuthProvider } from '@chat-app/api/v1/auth';
import { IUser } from '@chat-app/api/v1/user';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from 'passport-github';
import { User } from '../../utils/mongo';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<IUser>) {}
  async findOrCreate(profile: Profile, provider: AuthProvider): Promise<IUser> {
    const { id, displayName, photos, username } = profile;
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      const newUser = this.userModel.create({
        _id: id,
        provider,
        providerId: id,
        displayName: username || displayName,
        photos,
      });

      return newUser;
    }
    // TODO Perform database lookup to extract more information about the user
    // or to create the user if the UserId is unknown to us.
    // For now, we'll skip this and always return the same dummy user, regardless of the `userId`.
    return user;
  }
  async find(id: string): Promise<IUser> {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) throw new NotFoundException();
    return user;
  }

  async findAll(): Promise<IUser[]> {
    return this.userModel.find();
  }

  async findMe(id: string): Promise<IUser> {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) throw new NotFoundException();
    return user;
  }
}
