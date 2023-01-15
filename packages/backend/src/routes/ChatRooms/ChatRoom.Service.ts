import { NextFunction, Request, Response } from 'express';
import User from '../../models/User.model';
import Chats from '../../models/chatRoom.model';
import Invites from '../../models/Invites.model';
import { CustomError } from '../../utils/custom-error.model';
import { Schema } from 'mongoose';
import { resMessages } from '../../common/constants';

class ChatRoomService {
  async GetChatRooms(req: Request, res: Response, next: NextFunction) {
    const user_id = req.query.user_id;
    const user = await User.findOne({ _id: user_id }).exec();
    if (!user) return next(CustomError.notFound(resMessages.user.NOT_FOUND));

    const chatRooms = await Chats.find({ members: user.id }).exec();
    if (chatRooms.length <= 0) return next(CustomError.notFound(resMessages.chat.NOT_FOUND));
    return res.status(200).json(chatRooms);
  }

  async GetChatRoom(req: Request, res: Response, next: NextFunction) {
    const user_id = req.query.user_id as unknown as Schema.Types.ObjectId;
    const chat_id = req.params.chat_id;

    const user = await User.findOne({ _id: user_id }).exec();
    if (!user) return next(CustomError.notFound(resMessages.user.NOT_FOUND));

    const chat = await Chats.findOne({ _id: chat_id, members: user.id }).exec();
    if (!chat) return next(CustomError.notFound(resMessages.chat.NOT_FOUND));

    return res.status(200).json(chat);
  }

  async CreateChatRoom(req: Request, res: Response, next: NextFunction) {
    const chatReqObject = {
      inviteId: req.body.invite_id,
      user1: req.body.user1,
      user2: req.body.user2,
    };

    const { inviteId, user1, user2 } = chatReqObject;

    const checkIfInviteExist = await Invites.findOne({ _id: inviteId });
    if (!checkIfInviteExist) return next(CustomError.notFound(resMessages.invite.NOT_FOUND));

    const isUser1 = await User.findOne({ username: user1 });
    if (!isUser1) return next(CustomError.notFound(resMessages.user.NOT_FOUND));

    const isUser2 = await User.findOne({ username: user2 });
    if (!isUser2) return next(CustomError.notFound(resMessages.user.NOT_FOUND));

    const checkIfRoomExist = await Chats.findOne({ members: [isUser1._id, isUser2._id] });
    if (checkIfRoomExist) return next(CustomError.conflict(resMessages.chat.ALREADY_EXIST));

    const findInvite = await Invites.findByIdAndUpdate(inviteId, { status: 'accepted' }, { new: true });
    if (!findInvite) return next(CustomError.notFound(resMessages.invite.NOT_FOUND));

    const chat = await new Chats({
      members: [isUser1.id, isUser2.id],
    });

    await chat.save();
    return res.status(201).json(chat);
  }

  async UpdateChatRoom(req: Request, res: Response, next: NextFunction) {
    const chatReqObject = {
      chatId: req.params.chat_id,
      addedUsers: req.body.usernames || [],
      removedUser: req.body.username || '',
    };
    const { chatId, addedUsers, removedUser } = chatReqObject;

    const chatRoom = await Chats.findOne({ _id: chatId, members: req.body.user_id }).exec();
    if (!chatRoom) return next(CustomError.notFound(resMessages.chat.NOT_FOUND));
    const chatMembers = chatRoom && chatRoom.members;

    let updatedChatRoom;
    let updated_array: string[] = [];

    if (chatMembers && removedUser) updated_array = chatMembers.filter((item) => item !== removedUser);
    if (updated_array.length < 2) {
      const isDublicate = await Chats.findOne({ _id: chatId, data: updated_array });
      if (isDublicate) {
        await Chats.deleteOne({ _id: chatId }).exec();
        return res.status(200).json({ Message: resMessages.chat.DELETE });
      }
    }
    if (removedUser) {
      updatedChatRoom = await Chats.findByIdAndUpdate(
        { _id: chatId },
        {
          members: updated_array,
        },
      );
    }
    if (addedUsers.length > 0) {
      updatedChatRoom = await Chats.findByIdAndUpdate(
        { _id: chatId },
        {
          $push: { members: addedUsers },
        },
      );
    }
    return res.status(200).json(updatedChatRoom);
  }

  async DeleteChatRoom(req: Request, res: Response, next: NextFunction) {
    const chatReqObject = {
      chatId: req.params.chat_id,
      userId: req.body.user_id,
    };
    const { userId, chatId } = chatReqObject;
    const chatRoom = await Chats.findOne({ _id: chatId, members: userId }).exec();
    if (!chatRoom) return next(CustomError.notFound(resMessages.chat.NOT_FOUND));

    await Chats.deleteOne({ _id: chatId }).exec();
    return res.status(200).json({ Message: resMessages.chat.DELETE });
  }
}

export default ChatRoomService;
