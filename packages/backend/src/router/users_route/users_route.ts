import * as express from "express";
import { registerValidation } from "../../helpers/schema";
import { Request, Response } from "express";
const route = express.Router();
import User from "../../models/User.model";
import Invites from "../../models/Invites.model";
import Chats from "../../models/chatRoom.model";

route.post("/register", async (req: Request, res: Response) => {
  try {
    const { error } = registerValidation(req.body);
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const gender = req.body.gender;
    if (error) {
      return res.status(409).json({ message: error.message });
    }

    const users = await User.findOne({ username }).exec();
    if (users) return res.status(409).json({ message: "user already exist" });
    console.log(gender);

    const user = new User({
      type: "POST",
      username,
      password,
      email,
      gender,
    });

    console.log(user);

    const chat = await new Chats({
      members: username,
    });

    await user.save();
    await chat.save();
    return res
      .status(201)
      .send({ message: `User ${req.body.username} created` });
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while registering",
    });
  }
});

route.delete("/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    await User.deleteOne({ username }).exec();
    await Invites.deleteMany({
      reciever: username,
    }).exec();
    await Chats.deleteMany({
      members: { $all: [username] },
    }).exec();
    return res.status(204).json({ message: `user ${username} deleted` });
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while deleting",
    });
  }
});

export { route };
