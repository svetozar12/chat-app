import { Chat } from '@chat-app/api/db';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SearchService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}
  /**
   * Asynchronously search the chatModel for a name containing the specified searchText.
   *
   * @param {string} searchText - The text to search for.
   * @returns {Promise<Object[]>} - A promise that resolves to an array of chat objects matching the search text.
   */

  async searchChat(searchText: string) {
    return this.chatModel.find({
      name: {
        $regex: searchText,
        $options: 'i',
      },
    });
  }
}
