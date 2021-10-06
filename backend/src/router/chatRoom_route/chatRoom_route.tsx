const express = require("express");
const route = express.Router();
const createError = require("http-errors");

import { Request, Response } from "express";
import { read } from "fs";

const Chats = require("../../models/chatRoom.model");

route.get("/chat-room/users-rooms", async (req: Request, res: Response) => {
  try {
    const users_rooms = await Chats.find({}).exec();
    if (!users_rooms || users_rooms.length <= 0)
      return res.status(404).json({ Message: "User rooms not found" });
    return res.status(200).json({ Message: users_rooms });
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ Message: "Something went wrong while getting the users" });
  }
});

route.post("/chat-room/messages", async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const date = today.getHours() + ":" + today.getMinutes();
    const result = today.toLocaleDateString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const user1 = req.body.user1;
    const user2 = req.body.user2;
    const sender = req.body.sender;
    const message = req.body.message;

    const chat = await new Chats({
      members: [{ user1, user2 }],
      messages: [
        {
          sender,
          time_stamp: result,
          message,
          seenBy: [],
        },
      ],
    });

    await chat.save();

    return res.json({ Message: chat });
  } catch (error) {
    console.log(error);

    return res
      .status(501)
      .json({ Message: "Something went wrong while sending the message" });
  }
});

route.post("/chat-room/seen_by", async (req: Request, res: Response) => {
  try {
    const readBy = req.query.readBy;
    const chat = await Chats.findOne({ _id: req.body.id });
    if (!chat) {
      return res.status(404).json({ Message: "error 404 not found" });
    }
    if (readBy == null) return;
    chat.messages.forEach((element) => {
      const found = element.seenBy.find((element) => element === readBy);
      console.log(found);
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
    return res
      .status(501)
      .json({ Message: "Something went wrong while seeing the message" });
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
