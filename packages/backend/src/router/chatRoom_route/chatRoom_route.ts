interface IRequest {
  user_name: string;
}

import * as express from "express";
import { Request, Response } from "express";
import Chats from "../../models/chatRoom.model";
import Invites from "../../models/Invites.model";
const route = express.Router();
route.get(
  "/",
  async (
    req: Request<undefined, undefined, undefined, IRequest>,
    res: Response,
  ) => {
    try {
      const user_name = req.query?.user_name;
      const contacts = await Chats.find({ members: user_name }).exec();
      if (!contacts)
        return res
          .status(400)
          .json({ Message: "the chat room wasn't created" });
      return res.status(201).json({ contacts });
    } catch (error) {
      return res.status(501).json({
        ErrorMsg: (error as Error).message,
        Error: "Internal server error",
        Message: "Something went wrong while getting the list of contacts",
      });
    }
  },
);

route.get("/:user_id", async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id;

    const users_rooms = await Chats.find({ _id: user_id }).exec();
    if (!users_rooms || users_rooms.length <= 0)
      return res.status(404).json({ Message: "User room not found !" });
    return res.status(200).json({ Message: users_rooms });
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while searching for your chat room",
    });
  }
});

route.put("/:user_id", async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id;
    const added_user = req.body.usernames;
    const deleted_user = req.query.username;
    const users_rooms = await Chats.findOne({ _id: user_id }).exec();
    const users_array = users_rooms!.members;

    if (!users_rooms)
      return res.status(404).json({ Message: "User room not found !" });
    let updated_array: string[] = [];
    if (deleted_user) {
      updated_array = users_array.filter((item) => item !== deleted_user);
      if (updated_array.length === 2) {
        await Chats.deleteOne({ _id: user_id }).exec();
        return res.status(200).json({ message: "deleted chat-room" });
      }
    }
    let updated;
    if (deleted_user) {
      updated = await Chats.findByIdAndUpdate(
        { _id: user_id },
        {
          members: updated_array,
        },
      );
    }
    updated = await Chats.findByIdAndUpdate(
      { _id: user_id },
      {
        $push: { members: added_user },
      },
    );
    console.log(added_user, "  ", updated);

    return res.status(200).json({ Message: updated });
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while searching for your chat room",
    });
  }
});

// route.put("/chat-room/:id", async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     const readBy = req.body.read_by;
//     const chat = await Chats.findOne({ _id: id });

//     if (!chat) {
//       return res.status(404).json({ Message: "error 404 not found" });
//     }
//     if (readBy == null) return;
//     chat.messages.forEach((element) => {
//       const found = element.seenBy.find((element) => element === readBy);
//       if (found)
//         return res
//           .status(409)
//           .json({ Message: `User ${readBy} already saw the message` });

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

export { route };
