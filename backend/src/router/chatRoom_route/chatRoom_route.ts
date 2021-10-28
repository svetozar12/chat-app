import * as express from "express";
import * as mongoose from "mongoose";
import { Request, Response } from "express";
import Chats from "../../models/chatRoom.model";
const route = express.Router();
route.get("/chat-room/list/:user_name", async (req: Request, res: Response) => {
  // change param in querry
  try {
    const contacts = await Chats.find({ members: req.params.user_name }).select(
      ["-messages"],
    );
    return res.status(201).json({ contacts });
  } catch (error) {
    return res.status(501).json({
      Message: "Something went wrong while getting the list of contacts",
      error,
    });
  }
});

route.get("/chat-room/:user_id", async (req: Request, res: Response) => {
  try {
    type ObjectIdConstructor = {
    (str: string): mongoose.Types.ObjectId;
    new (str: string): mongoose.Types.ObjectId;
}
    const user_id: = (mongoose.Types.ObjectId as ObjectIdConstructor)(req.params.user_id);
    const page_size = parseInt(req.query?.page_size as string) || 10;
    const page_number = parseInt(req.query?.page_number as string) || 1;
    // const users_rooms = await Chats.find(
    //   {
    //     _id: user_id,
    //   },
    //   {
    //     messages: {
    //       $limit: "2", // some strange typeScript error (don'n know how to fix it)
    //     },
    //   },
    // );
    const users_rooms = await Chats.aggregate([
      { $match: { _id: user_id } },
    ]).exec();
    console.log(users_rooms);

    if (!users_rooms || users_rooms.length <= 0)
      // return res.status(404).json({ Message: users_rooms });
      return res.status(404).json({ Message: "User room not found" });
    return res.status(200).json({ Message: users_rooms });
  } catch (error) {
    return res.status(501).json({
      Message: "Something went wrong while getting the users",
      error,
    });
  }
});

route.post("/chat-room", async (req: Request, res: Response) => {
  try {
    const date = new Date();
    let currentHours: string | number = date.getHours().toString();
    let currentMinutes: string | number = date.getMinutes().toString();
    const time_stamp = `${currentHours.padStart(
      2,
      "0",
    )}:${currentMinutes.padStart(2, "0")}`;

    const sender = req.body.sender;
    const message = req.body.message;
    const id = req.query.id;

    const findRoom = await Chats.findOne({
      _id: id,
    }).exec();

    console.log("RANDOM", findRoom);
    const user1 = req.body.user1;
    const user2 = id ? findRoom!.members[1] : req.body.user2;
    if (!findRoom) {
      const chat = await new Chats({
        members: [user1, user2],
      });

      await chat.save();
      return res.json({ Message: chat });
    } else {
      findRoom.messages.push({
        sender,
        message,
        seenBy: [],
      });
      await findRoom.save();
    }
    return res.status(201).json({ message: findRoom });
  } catch (error) {
    return res.status(501).json({
      Message: "Something went wrong while sending the message",
    });
  }
});

route.put("/chat-room/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const readBy = req.body.read_by;
    const chat = await Chats.findOne({ _id: id });

    if (!chat) {
      return res.status(404).json({ Message: "error 404 not found" });
    }
    if (readBy == null) return;
    chat.messages.forEach((element) => {
      const found = element.seenBy.find((element) => element === readBy);
      if (found)
        return res
          .status(409)
          .json({ Message: `User ${readBy} already saw the message` });

      element.seenBy.push(readBy);
    });
    await chat.save();
    return res
      .status(201)
      .json({ Message: `User ${readBy} saw the message`, chat });
  } catch (error) {
    return res.status(501).json({
      Message: "Something went wrong while seeing the message",
      error,
    });
  }
});

export { route };
