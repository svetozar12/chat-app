import * as express from "express";
import { Request, Response } from "express";
import Messages from "../../models/Message.model";
const route = express.Router();

route.get("/messages/:chat_id", async (req: Request, res: Response) => {
  try {
    const page_size = Number(req.query.page_size);
    const page_number = Number(req.query.page_number);
    const chat_id = req.params.chat_id;
    const messages = await Messages.find({ chatInstance: chat_id })
      .limit(page_size)
      .skip((page_number - 1) * page_size)
      .sort({ createdAt: "desc" });
    const reversedArr = messages.reverse();
    return res.status(200).json({ reversedArr });
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ Message: "Something went wrong while sending the msg" });
  }
});

route.post("/messages/:chat_id", async (req: Request, res: Response) => {
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
    await messages.save();
    return res.json({ messages });
  } catch (error) {
    return res.status(501).json({
      Message: "Something went wrong while sending the message",
    });
  }
});

export { route };
