interface IRequest {
  user_name: string;
}

interface IChatRoomController {
  GetChatRooms: (
    req: Request<undefined, undefined, undefined, IRequest>,
    res: Response,
    next: NextFunction,
  ) => Promise<void | Response<any, Record<string, any>>>;
  GetChatRoom: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
  CreateChatRoom: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
  UpdateChatRoom: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
  DeleteChatRoom: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
}

import { NextFunction, Request, Response } from "express";
import Chats from "../../models/chatRoom.model";
import Invites from "../../models/Invites.model";
import User from "../../models/User.model";
import { CustomError } from "../../models/custom-error.model";

const ChatRoomController: IChatRoomController = {
  GetChatRooms: async (req: Request<undefined, undefined, undefined, IRequest>, res: Response, next: NextFunction) => {
    const user_name = req.query?.user_name;
    const contacts = await Chats.find({ members: user_name }).exec();
    if (contacts.length <= 0) return next(CustomError.notFound("You don't have chat rooms"));
    return res.status(200).json({ data: `You have active chat-rooms`, contacts });
  },

  GetChatRoom: async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.params.user_id;
    const users_rooms = await Chats.findOne({ _id: user_id }).exec();
    if (!users_rooms) return next(CustomError.notFound("Chat room not found"));
    return res.status(200).json({ data: users_rooms });
  },

  CreateChatRoom: async (req: Request, res: Response, next: NextFunction) => {
    const invite_id = req.body.invite_id;
    const user1 = req.body.user1;
    const user2 = req.body.user2;

    const checkIfInviteExist = await Invites.findOne({ _id: invite_id });
    const checkUser1IfExist = await User.findOne({ username: user1 });
    const checkUser2IfExist = await User.findOne({ username: user2 });
    const checkIfRoomExist = await Chats.findOne({ members: [user1, user2] });
    console.log(checkIfInviteExist, "invite");

    if (checkIfRoomExist) return next(CustomError.conflict("Chat room already exists !"));
    if (!checkIfInviteExist) return next(CustomError.notFound("Invite not found"));
    if (!checkUser1IfExist) return next(CustomError.notFound(`User ${user1} not found`));
    if (!checkUser2IfExist) return next(CustomError.notFound(`User ${user2} not found`));

    const findInvite = await Invites.findByIdAndUpdate(invite_id, { status: "accepted" }, { new: true });

    if (!findInvite) return next(CustomError.notFound("Invite not found"));

    const chat = await new Chats({
      members: [user1, user2],
    });

    await chat.save();
    return res.status(201).json({ message: "chat-room was created", Message: chat });
  },

  UpdateChatRoom: async (req: Request, res: Response, next: NextFunction) => {
    const chat_id = req.params.chat_id;
    const added_user = req.body.usernames || [];
    const deleted_user = req.body.username || "";

    const users_rooms = await Chats.findOne({ _id: chat_id }).exec();

    const users_array = users_rooms && users_rooms.members;
    let updated;
    let updated_array: string[] = [];

    if (!users_rooms) next(CustomError.notFound("Chat room not found ."));
    if (users_array && deleted_user) updated_array = users_array.filter((item) => item !== deleted_user);
    if (updated_array.length === 2) {
      await Chats.deleteOne({ _id: chat_id }).exec();
      return res.status(200).json({ message: "deleted chat-room" });
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

    return res.status(200).json({ message: "Chat-room members were updated", Message: updated });
  },

  DeleteChatRoom: async (req: Request, res: Response, next: NextFunction) => {
    const chat_id = req.params.chat_id;
    const isExist = await Chats.findOne({ _id: chat_id }).exec();

    if (!isExist) return next(CustomError.notFound(`Chat room ${chat_id} not found !`));
    await Chats.deleteOne({ _id: chat_id }).exec();
    return res.status(200).json({ Message: `Chat_room ${chat_id} is deleted` });
  },
};

export default ChatRoomController;
