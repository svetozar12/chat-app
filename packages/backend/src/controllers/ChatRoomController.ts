interface IRequest {
  user_name: string;
}

import { Request, Response, Router } from "express";
import Chats from "../models/chatRoom.model";
import Invites from "../models/Invites.model";
import User from "../models/User.model";

const ChatRoomController = Router();

ChatRoomController.get("/", async (req: Request<undefined, undefined, undefined, IRequest>, res: Response) => {
  try {
    const user_name = req.query?.user_name;

    const contacts = await Chats.find({ members: user_name }).exec();
    console.log(contacts);
    if (contacts.length <= 0) return res.status(400).json({ ErrorMsg: "You don't have chat rooms" });
    return res.status(200).json({ message: `You have active chat-rooms`, contacts });
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while getting the list of contacts",
    });
  }
});

ChatRoomController.get("/:user_id", async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id;

    const users_rooms = await Chats.findOne({ _id: user_id }).exec();
    if (!users_rooms) return res.status(404).json({ ErrorMsg: "User room not found !" });
    return res.status(200).json({ Message: users_rooms });
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while searching for your chat room",
    });
  }
});

ChatRoomController.put("/chat-room", async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const user1 = req.body.user1;
    const user2 = req.body.user2;
    const checkIfExist = await Invites.findOne({ _id: id });
    const checkUser1IfExist = await User.findOne({ username: user1 });
    const checkUser2IfExist = await User.findOne({ username: user2 });
    if (!checkIfExist) return res.status(404).json({ ErrorMsg: "Invite not found" });
    if (!checkUser1IfExist) return res.status(404).json({ ErrorMsg: `User ${user1} not found` });
    if (!checkUser2IfExist) return res.status(404).json({ ErrorMsg: `User ${user2} not found` });

    const findInvite = await Invites.findByIdAndUpdate(id, { status: "accepted" }, { new: true });

    const testingUser1 = await User.findOne({ username: user1 });
    const testingUser2 = await User.findOne({ username: user2 });

    if (!testingUser1 || !testingUser2) return res.status(404).json({ ErrorMsg: "User doesn't exist !" });

    if (!findInvite) {
      return res.status(404).json({ ErrorMsg: "Invite not found" });
    }

    const chat = await new Chats({
      members: [user1, user2],
    });

    await chat.save();
    return res.status(201).json({ message: "chat-room was created", Message: chat });
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while sending invite",
    });
  }
});

ChatRoomController.put("/:chat_id", async (req: Request, res: Response) => {
  try {
    const chat_id = req.params.user_id;
    const added_user = req.body.usernames;
    const deleted_user = req.body.username;

    const users_rooms = await Chats.findOne({ _id: chat_id }).exec();
    const users_array = users_rooms!.members;
    let updated;

    if (!users_rooms) return res.status(404).json({ ErrorMsg: "Chat-room not found !" });
    let updated_array: string[] = [];
    if (deleted_user) {
      updated_array = users_array.filter((item) => item !== deleted_user);
      if (updated_array.length === 2) {
        await Chats.deleteOne({ _id: chat_id }).exec();
        return res.status(200).json({ message: "deleted chat-room" });
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
    return res.status(200).json({ message: "Chat-room members were updated", Message: updated });
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while searching for your chat room",
    });
  }
});

ChatRoomController.delete("/delete_chat/:chat_id", async (req: Request, res: Response) => {
  try {
    const chat_id = req.params.chat_id;
    const chat_room = await Chats.findOne({ _id: chat_id }).exec();

    if (!chat_room) return res.status(404).json({ ErrorMsg: `Chat room ${chat_id} not found !` });
    return res.status(200).json({ Message: `Chat_room ${chat_id} is deleted` });
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while searching for your chat room",
    });
  }
});

// ChatRoomController.put("/chat-room/:id", async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     const readBy = req.body.read_by;
//     const chat = await Chats.findOne({ _id: id });

//     if (!chat) {
//       return res.status(404).json({ ErrorMsg: "error 404 not found" });
//     }
//     if (readBy == null) return;
//     chat.messages.forEach((element) => {
//       const found = element.seenBy.find((element) => element === readBy);
//       if (found)
//         return res
//           .status(409)
//           .json({ ErrorMsg: `User ${readBy} already saw the message` });

//       element.seenBy.push(readBy);
//     });
//     await chat.save();
//     return res
//       .status(201)
//       .json({ Message: `User ${readBy} saw the message`, chat });
//   } catch (error) {
//     return res.status(501).json({
//       ErrorMsg: error.message,
//       Error:"Internal server error",
//       Message: "Something went wrong while seeing the message",
//     });
//   }
// });

export { ChatRoomController };
