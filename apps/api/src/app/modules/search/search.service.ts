import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../../utils/mongo';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SearchService {
  constructor(@InjectModel(User.name) private messageModel: Model<User>) {}
  searchUser(value: string) {
    return this.messageModel
      .find({
        $and: [{ displayName: { $regex: value ? `.*${value}.*` : '' } }],
      })
      .exec();
  }
}
