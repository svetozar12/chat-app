import * as express from "express";
import { Request, Response } from "express";
import Messages from "../../models/Message.model";
import User from "../../models/User.model";
const route = express.Router();

route.get("/:chat_id", async (req: Request, res: Response) => {
  try {
    const page_size = Number(req.query.page_size);
    const page_number = Number(req.query.page_number);
    const chat_id = req.params.chat_id;
    const messages = await Messages.find({ chatInstance: chat_id })
      .limit(page_size)
      .skip((page_number - 1) * page_size)
      .sort({ createdAt: "desc" });
    if (messages.length <= 0 || !messages) return res.status(404).json({ message: "You don't have messages." });
    const reversedArr = messages.reverse();
    return res.status(200).json({ message: "You have messages.", reversedArr });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while sending the msg",
    });
  }
});

route.post("/:chat_id", async (req: Request, res: Response) => {
  try {
    const chat_id = req.params.chat_id;
    const sender = req.body.sender;
    const message = req.body.message;

    const messages = await new Messages({
      chatInstance: chat_id,
      sender: sender,
      message: message,
      seenBy: [],
    });
    if (!message) return res.status(400).json({ message });
    await messages.save();
    return res.status(201).json({ messages });
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while sending the message",
    });
  }
});

route.delete("/:chat_id", async (req: Request, res: Response) => {
  try {
    const chat_id = req.params.chat_id;
    const sender = req.body.sender;
    const message = req.body.message;
    const isUser = await User.findOne({ username: sender });
    if (!isUser) return res.status(404).json({ message: `User: ${sender} not found` });
    const isMessages = await Messages.findOne({
      chatInstance: chat_id,
      message,
    });
    if (!isMessages) return res.status(404).json({ message: `Message: ${message} not found` });
    await Messages.deleteOne({ chatInstance: chat_id, message, sender });
    return res.status(200).json({ message: `Message ${message} has been deleted` });
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while sending the message",
    });
  }
});

export { route };
