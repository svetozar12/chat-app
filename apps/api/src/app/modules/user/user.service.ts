import { Injectable } from '@nestjs/common';
import { User } from '@chat-app/api/db';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserWithoutPassword } from './dto/user.dto';
// This should be a real class/interface representing a user entity

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(_id: string): Promise<User | undefined> {
    return this.userModel.findOne({ _id });
  }
  async createUser(
    user: UserWithoutPassword,
    hashedPassword: string
  ): Promise<User> {
    return this.userModel.create({ ...user, password: hashedPassword });
  }
  async updateUser(_id: string, user: User): Promise<User> {
    return this.userModel.findOneAndUpdate({ _id }, user);
  }
  async deleteUser(_id: string): Promise<User> {
    return this.userModel.findOneAndDelete({ _id });
  }
}
