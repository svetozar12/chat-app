const express = require("express");
const route = express.Router();
const createError = require("http-errors");

import { Request, Response } from "express";

const Chats = require("../../models/chatRoom.model");

route.get("/chat-room/list/:user_id", async (req: Request, res: Response) => {
  try {
    const contacts = await Chats.find({ members: req.params.user_id });
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
    const user_id = req.params.user_id;
    const users_rooms = await Chats.find({
      _id: user_id,
    });
    if (!users_rooms || users_rooms.length <= 0)
      return res.status(404).json({ Message: "User room not found" });
    // const new_users_rooms = users_rooms.slice(-10);
    return res.status(200).json({ Message: users_rooms });
  } catch (error) {
    return res.status(501).json({
      Message: "Something went wrong while getting the users",
      error,
    });
  }
});

route.post("/chat-room/messages", async (req: Request, res: Response) => {
  try {
    const date = new Date();
    let currentHours: string | number = date.getHours().toString();
    let currentMinutes: string | number = date.getMinutes().toString();
    const time_stamp = `${currentHours.padStart(
      2,
      "0",
    )}:${currentMinutes.padStart(2, "0")}`;
    const user1 = req.body.user1;
    const user2 = req.body.user2;
    const sender = req.body.sender;
    const message = req.body.message;

    const findRoom = await Chats.findOneAndUpdate(
      { members: { $all: [user1, user2] } },
      {
        members: [user1, user2],
        $push: {
          messages: [
            {
              sender,
              time_stamp,
              message,
              seenBy: [],
            },
          ],
        },
      },
    );

    if (!findRoom) {
      console.log("new chat");
      const chat = await new Chats({
        members: [user1, user2],
        messages: [
          {
            sender,
            time_stamp,
            message,
            seenBy: [],
          },
        ],
      });

      await chat.save();
      return res.json({ Message: chat });
    }

    console.log(findRoom);
    await findRoom.save();
    return res.status(201).json({ message: findRoom });
  } catch (error) {
    console.log(error);

    return res.status(501).json({
      Message: "Something went wrong while sending the message",
    });
  }
});

route.post("/chat-room/:id", async (req: Request, res: Response) => {
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

route.delete("/chat-room/dev-delete", async (req: Request, res: Response) => {
  try {
    const deleteChats = await Chats.deleteMany({});
    return res.status(204);
  } catch (error) {
    res
      .status(501)
      .json({ Message: "Something went wrong while deleting the chats" });
  }
});

module.exports = route;
