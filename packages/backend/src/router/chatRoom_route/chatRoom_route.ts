import * as express from "express";
import { Request, Response } from "express";
import Chats from "../../models/chatRoom.model";
const route = express.Router();
route.get("/chat-room", async (req: Request, res: Response) => {
  try {
    const user_name = req.query?.user_name;
    const contacts = await Chats.find({ members: user_name }).exec();
    if (!contacts)
      return res.status(400).json({ Message: "the chat room wasn't created" });
    return res.status(201).json({ contacts });
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while getting the list of contacts",
    });
  }
});

route.get("/chat-room/:user_id", async (req: Request, res: Response) => {
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