import { Request, Response, Router } from "express";
import { registerValidation, update_formValidation } from "../utils/schema";
import User from "../models/User.model";
import Invites from "../models/Invites.model";
import Chats from "../models/chatRoom.model";
import * as multer from "multer";

const UsersController: Router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req: Request<any>, file: any, cb: any) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") cb(null, true);
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});

UsersController.get("/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const users = await User.findOne({ username }).exec();
    if (!users) return res.status(404).json({ ErrorMsg: `User: ${username} wasn't found` });
    return res.status(200).send({ user: users });
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while registering",
    });
  }
});

UsersController.post("/register", async (req: Request, res: Response) => {
  try {
    const { error } = registerValidation(req.body);
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const gender = req.body.gender;
    if (error) {
      return res.status(409).json({ ErrorMsg: error.message });
    }

    const users = await User.findOne({ username }).exec();
    if (users) return res.status(409).json({ ErrorMsg: "user already exist" });

    const user = new User({
      type: "POST",
      username,
      password,
      email,
      userAvatar: "",
      gender,
    });

    const chat = await new Chats({
      members: username,
    });

    await user.save();
    await chat.save();
    return res.status(201).send({ message: `User ${req.body.username} created` });
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while registering",
    });
  }
});

UsersController.put("/update", upload.single("userAvatar"), async (req: Request, res: Response) => {
  try {
    const { error } = update_formValidation(req.body);
    const username = req.body.username;
    let email = req.body.email;
    const gender = req.body.gender;
    const userAvatar = req.file?.filename;
    const users = await User.findOne({ username }).exec();
    if (!email) email = users?.email;
    const user_id = users?._id;

    if (error) {
      return res.status(409).json({ ErrorMsg: error.message });
    }

    if (!users) return res.status(404).json({ ErrorMsg: "User not found" });
    await User.findByIdAndUpdate(user_id, {
      email: email ? email : users.email,
      gender: gender ? gender : users.gender,
      userAvatar: email ? userAvatar : users.userAvatar,
    });
    return res.status(200).send({ message: `User ${username} info updated` });
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while registering",
    });
  }
});

UsersController.delete("/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username }).exec();
    if (!user) return res.status(404).json({ ErrorMsg: `User ${username} is not found` });
    await User.deleteOne({ username }).exec();
    await Invites.deleteMany({
      reciever: username,
    }).exec();
    await Invites.deleteMany({
      inviter: username,
    }).exec();
    await Chats.deleteMany({
      members: { $all: [username] },
    }).exec();
    return res.status(200).json({ message: `User ${username} deleted` });
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while deleting",
    });
  }
});

export { UsersController };
