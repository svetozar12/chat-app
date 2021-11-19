import * as express from "express";
import registerValidation from "../../helpers/schema";
import { Request, Response } from "express";
const route = express.Router();

import User from "../../models/User.model";
import Invites from "../../models/Invites.model";
import Chats from "../../models/chatRoom.model";

route.get("/users/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const params = req.params;

    const users = await User.findOne({
      username,
    }).exec();
    const { error } = registerValidation(params);

    if (error) {
      return res.status(409).json({ message: error.message });
    }

    if (!users || undefined)
      return res.status(404).json({
        ERROR: "Not found",
        message: `User ${req.params.username} doesn't exist`,
      });

    return res.status(200).json({ message: users });
  } catch (error: any) {
    return res.status(501).json({
      Error: "Internal server error",
      Message: "Something went wrong while loging",
    });
  }
});

route.post("/users/register", async (req: Request, res: Response) => {
  try {
    const { error } = registerValidation(req.body);
    const username = req.body.username;
    if (error) {
      return res.status(409).json({ message: error.message });
    }

    const users = await User.findOne({ username }).exec();
    if (users) return res.status(409).json({ message: "user already exist" });

    const user = new User({ type: "POST", username: req.body.username });

    await user.save();
    return res
      .status(201)
      .send({ message: `User ${req.body.username} created` });
  } catch (error: any) {
    return res.status(501).json({
      ErrorMsg: error.message,
      Error: "Internal server error",
      Message: "Something went wrong while registering",
    });
  }
});

route.delete("/users/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const deleteUser = await User.deleteOne({ username }).exec();
    const deleteInvites = await Invites.deleteMany({
      reciever: username,
    }).exec();
    const deleteChats = await Chats.deleteMany({
      members: { $all: [username] },
    }).exec();
    return res.status(204).json({ message: `user ${username} deleted` });
  } catch (error) {
    return res.status(501).json({
      Error: "Internal server error",
      Message: "Something went wrong while deleting",
    });
  }
});

export { route };
