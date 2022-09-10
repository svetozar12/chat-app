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

    const contacts = await Chats.find({ members: user.username }).exec();
    if (contacts.length <= 0) return next(CustomError.notFound(resMessages.chat.NOT_FOUND));
    return res.status(200).json({ data: resMessages.chat.YOU_HAVE_CHATS, contacts });
  }

  async GetChatRoom(req: Request, res: Response, next: NextFunction) {
    const user_id = req.query.user_id as unknown as Schema.Types.ObjectId;
    const chat_id = req.params.chat_id;

    const user = await User.findOne({ _id: user_id });

    if (!user) return next(CustomError.notFound(resMessages.user.NOT_FOUND));
    const users_rooms = await Chats.findOne({ _id: chat_id, members: user.username }).exec();
    if (!users_rooms) return next(CustomError.notFound(resMessages.chat.NOT_FOUND));
    return res.status(200).json({ data: users_rooms });
  }

  async CreateChatRoom(req: Request, res: Response, next: NextFunction) {
    const invite_id = req.body.invite_id;
    const user1 = req.body.user1;
    const user2 = req.body.user2;

    const checkIfInviteExist = await Invites.findOne({ _id: invite_id });

    const isUser1 = await User.findOne({ username: user1 });
    const isUser2 = await User.findOne({ username: user2 });
    if (!isUser1) return next(CustomError.notFound(resMessages.user.NOT_FOUND));
    if (!isUser2) return next(CustomError.notFound(resMessages.user.NOT_FOUND));
    const checkIfRoomExist = await Chats.findOne({ members: [isUser1._id, isUser2._id] });

    if (checkIfRoomExist) return next(CustomError.conflict(resMessages.chat.ALREADY_EXIST));
    if (!checkIfInviteExist) return next(CustomError.notFound(resMessages.invite.NOT_FOUND));

    const findInvite = await Invites.findByIdAndUpdate(invite_id, { status: 'accepted' }, { new: true });

    if (!findInvite) return next(CustomError.notFound(resMessages.invite.NOT_FOUND));

    const chat = await new Chats({
      members: [isUser1.username, isUser2.username],
    });

    await chat.save();
    return res.status(201).json({ Message: resMessages.chat.CREATE, data: chat });
  }

  async UpdateChatRoom(req: Request, res: Response, next: NextFunction) {
    const chat_id = req.params.chat_id;
    const added_user = req.body.usernames || [];
    const deleted_user = req.body.username || '';

    const users_rooms = await Chats.findOne({ _id: chat_id, members: req.body.user_id }).exec();

    const users_array = users_rooms && users_rooms.members;
    let updated;
    let updated_array: string[] = [];

    if (!users_rooms) return next(CustomError.notFound(resMessages.chat.NOT_FOUND));
    if (users_array && deleted_user) updated_array = users_array.filter((item) => item !== deleted_user);
    if (updated_array.length < 2) {
      const isDublicate = await Chats.findOne({ _id: chat_id, data: updated_array });
      if (isDublicate) {
        await Chats.deleteOne({ _id: chat_id }).exec();
        return res.status(200).json({ Message: resMessages.chat.DELETE });
      }
    }
    if (deleted_user) {
      updated = await Chats.findByIdAndUpdate(
        { _id: chat_id },
        {
          members: updated_array,
        },
      );
    }
    if (added_user.length > 0) {
      updated = await Chats.findByIdAndUpdate(
        { _id: chat_id },
        {
          $push: { members: added_user },
        },
      );
    }

    return res.status(200).json({ Message: resMessages.chat.UPDATE, data: updated });
  }

  async DeleteChatRoom(req: Request, res: Response, next: NextFunction) {
    const chat_id = req.params.chat_id;
    const user_id = req.body.user_id;
    const isExist = await Chats.findOne({ _id: chat_id, members: user_id }).exec();

    if (!isExist) return next(CustomError.notFound(resMessages.chat.NOT_FOUND));
    await Chats.deleteOne({ _id: chat_id }).exec();
    return res.status(200).json({ Message: resMessages.chat.DELETE });
  }
}

export default ChatRoomService;
