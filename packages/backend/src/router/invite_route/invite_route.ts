import * as express from "express";
import { Request, Response } from "express";
import Invites from "../../models/Invites.model";
import User from "../../models/User.model";
import Chats from "../../models/chatRoom.model";
const route = express.Router();

route.get("/invites/:id/", async (req: Request, res: Response) => {
  try {
    const name = req.params.id;
    let status = req.query.status as string;
    const invites =
      status !== undefined
        ? await Invites.find({
            reciever: name,
            status,
          })
        : await Invites.find({
            reciever: name,
          }).select("status  inviter reciever");

    if (!invites || invites.length <= 0) {
      return res.status(404).json({
        error: "You dont have invites.",
      });
    }

    return res.status(200).json({ invites });
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong with your invite",
    });
  }
});

route.get("/invites/inviter/:id/", async (req: Request, res: Response) => {
  try {
    const name = req.params.id;
    let status = req.query.status as string;

    const invites =
      status !== undefined
        ? await Invites.find({
            inviter: name,
            status,
          })
        : await Invites.find({
            inviter: name,
          }).select("status inviter reciever");
    console.log(invites);

    if (!invites || invites.length <= 0) {
      return res.status(404).json({
        error: "You dont have accepted invites .",
      });
    }

    return res.status(200).json({ invites });
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong with your invite request",
    });
  }
});

route.put("/invites", async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const status = req.body.status;
    const inviteInstance = await Invites.findOne({
      id,
    }).exec();

    if (!inviteInstance || !status) {
      return res.status(404).json({ error: "Invites not found" });
    }

    const updateStatus = await Invites.findByIdAndUpdate(
      id,
      {
        status,
      },
      { new: true },
    ).exec();

    return res.json({ message: updateStatus });
  } catch (error) {
    res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong with the invites",
    });
  }
});

route.post("/invites/group-chat", async (req: Request, res: Response) => {
  try {
    const usersData = req.body.usersData;
    for (const userData of usersData) {
      if ((await User.findOne({ username: userData })) === null) {
        return res.status(404).json({ error: `User ${userData} not found` });
      }
    }
    const chat = await new Chats({
      members: usersData,
    });

    await chat.save();
    return res.status(201).json({ Message: chat });
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while sending invite",
    });
  }
});

route.put("/chat-room", async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const user1 = req.body.user1;
    const user2 = req.body.user2;
    const findInvite = await Invites.findByIdAndUpdate(
      id,
      { status: "accepted" },
      { new: true },
    );

    const testingUser1 = await User.findOne({ username: user1 });
    const testingUser2 = await User.findOne({ username: user2 });

    if (!testingUser1 || !testingUser2)
      return res.status(404).json({ error: "User doesn't exist !" });

    if (!findInvite) {
      return res.status(404).json({ Message: "Invite not found" });
    }

    const chat = await new Chats({
      members: [user1, user2],
    });

    await chat.save();
    return res.status(201).json({ Message: chat });
  } catch (error) {
    return res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while sending invite",
    });
  }
});

route.post("/invites", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      username: req.body.reciever,
    }).exec();

    if (user === null) {
      return res.status(404).json({ ERROR: "User Not found" });
    }

    const checkInviteInstance = await Invites.findOne({
      id: user._id,
      reciever: req.body.reciever,
      inviter: req.body.inviter,
      $or: [{ status: "recieved" }, { status: "accepted" }],
    });

    if (checkInviteInstance)
      return res.status(409).json({ ERROR: "Already sent" });

    if (req.body.reciever === req.body.inviter)
      return res.status(409).json({ ERROR: "Can't send invites to yourself" });

    const invites = await new Invites({
      reciever: req.body.reciever,
      inviter: req.body.inviter,
      status: req.body.status,
    });
    await invites.save();

    return res.status(201).json({ message: invites });
  } catch (error) {
    res.status(501).json({
      ErrorMsg: (error as Error).message,
      Error: "Internal server error",
      Message: "Something went wrong while sending invite",
    });
  }
});

export { route };
