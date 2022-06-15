interface IChatRoomController {
  GetChatRooms: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
  GetChatRoom: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
  CreateChatRoom: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
  UpdateChatRoom: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
  DeleteChatRoom: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
}

import { NextFunction, Request, Response } from "express";
import { Schema } from "mongoose";
import Chats from "../../models/chatRoom.model";
import Invites from "../../models/Invites.model";
import User from "../../models/User.model";
import { CustomError } from "../../utils/custom-error.model";

const ChatRoomController: IChatRoomController = {
  GetChatRooms: async (req, res, next) => {
    const user_id = req.query.user_id;
    const user = await User.findOne({ _id: user_id }).exec();
    if (!user) return next(CustomError.notFound("User not found"));

    const contacts = await Chats.find({ members: user.username }).exec();
    if (contacts.length <= 0) return next(CustomError.notFound("You don't have chat rooms"));
    return res.status(200).json({ data: `You have active chat-rooms`, contacts });
  },

  GetChatRoom: async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.query.user_id as unknown as Schema.Types.ObjectId;
    const chat_id = req.params.chat_id;

    const user = await User.findOne({ _id: user_id });

    if (!user) return next(CustomError.notFound(`${user} not found`));
    const users_rooms = await Chats.findOne({ _id: chat_id, members: user.username }).exec();
    if (!users_rooms) return next(CustomError.notFound("Chat room not found"));
    return res.status(200).json({ data: users_rooms });
  },

  CreateChatRoom: async (req, res, next) => {
    const invite_id = req.body.invite_id;
    const user1 = req.body.user1;
    const user2 = req.body.user2;

    const checkIfInviteExist = await Invites.findOne({ _id: invite_id });

    const isUser1 = await User.findOne({ username: user1 });
    const isUser2 = await User.findOne({ username: user2 });
    if (!isUser1) return next(CustomError.notFound(`User ${user1} not found`));
    if (!isUser2) return next(CustomError.notFound(`User ${user2} not found`));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const checkIfRoomExist = await Chats.findOne({ members: [isUser1._id, isUser2._id] });

    if (checkIfRoomExist) return next(CustomError.conflict("Chat room already exists !"));
    if (!checkIfInviteExist) return next(CustomError.notFound("Invite not found"));

    const findInvite = await Invites.findByIdAndUpdate(invite_id, { status: "accepted" }, { new: true });

    if (!findInvite) return next(CustomError.notFound("Invite not found"));

    const chat = await new Chats({
      members: [isUser1.username, isUser2.username],
    });

    await chat.save();
    return res.status(201).json({ Message: "chat-room was created", data: chat });
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  UpdateChatRoom: async (req, res, next) => {
    const chat_id = req.params.chat_id;
    const added_user = req.body.usernames || [];
    const deleted_user = req.body.username || "";

    const users_rooms = await Chats.findOne({ _id: chat_id, members: req.body.user_id }).exec();

    const users_array = users_rooms && users_rooms.members;
    let updated;
    let updated_array: string[] = [];
    console.log(users_rooms, req.body, "pencho petrohana");

    if (!users_rooms) return next(CustomError.notFound("Chat room not found ."));
    if (users_array && deleted_user) updated_array = users_array.filter((item) => item !== deleted_user);
    if (updated_array.length < 2) {
      const isDublicate = await Chats.findOne({ _id: chat_id, data: updated_array });
      if (isDublicate) {
        await Chats.deleteOne({ _id: chat_id }).exec();
        return res.status(200).json({ Message: "deleted chat-room" });
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

    return res.status(200).json({ Message: "Chat-room members were updated", data: updated });
  },

  DeleteChatRoom: async (req, res, next) => {
    const chat_id = req.params.chat_id;
    const user_id = req.body.user_id;
    const isExist = await Chats.findOne({ _id: chat_id, members: user_id }).exec();

    if (!isExist) return next(CustomError.notFound(`Chat room ${chat_id} not found !`));
    await Chats.deleteOne({ _id: chat_id }).exec();
    return res.status(200).json({ Message: `Chat_room ${chat_id} is deleted` });
  },
};

export default ChatRoomController;
