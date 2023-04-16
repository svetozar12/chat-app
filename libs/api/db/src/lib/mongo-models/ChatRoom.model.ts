import { Schema, model } from 'mongoose';

export interface IChatRoom {
  members: [string];
}

const chatRoomSchema = new Schema<IChatRoom>({
  members: [
    {
      type: String,
      required: true,
    },
  ],
});

const ChatRooms = model<IChatRoom>('chatRoom', chatRoomSchema);
export { ChatRooms };
