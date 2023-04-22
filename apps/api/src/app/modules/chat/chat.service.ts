import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from '@chat-app/api/db';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}
  findAll(userId: string): Promise<Chat[]> {
    return this.chatModel.find({
      members: {
        $elemMatch: {
          $eq: userId,
        },
      },
    });
  }

  findOne(_id: string, userId: string): Promise<Chat> {
    const chat = this.chatModel.findById(_id, {
      members: {
        $elemMatch: {
          $eq: userId,
        },
      },
    });
    if (!chat) {
      throw new NotFoundException();
    }
    return chat;
  }
  create(createChatDto: CreateChatDto): Promise<Chat> {
    const { _id, userId } = createChatDto;
    const chat = this.chatModel.findById(_id, {
      members: {
        $elemMatch: {
          $eq: userId,
        },
      },
    });
    if (chat) {
      throw new ConflictException();
    }
    return this.chatModel.create(createChatDto);
  }

  update(_id: string, updateChatDto: UpdateChatDto): Promise<Chat> {
    const chat = this.chatModel.findOneAndUpdate(
      {
        _id,
        members: {
          $elemMatch: {
            $eq: updateChatDto.userId,
          },
        },
      },
      updateChatDto,
      {
        new: true,
      }
    );
    if (!chat) {
      throw new NotFoundException();
    }
    return chat;
  }

  delete(_id: string, userId: string): Promise<Chat> {
    const chat = this.chatModel.findOneAndDelete({
      _id,
      members: { $elemMatch: { $eq: userId } },
    });
    if (!chat) {
      throw new NotFoundException();
    }
    return chat;
  }
}
