const express = require("express");
const route = express.Router();

import { Request, Response } from "express";

const Invites = require("../../models/Invites.model");
const Users = require("../../models/User.model");

route.get("/invites/:id/", async (req: Request, res: Response) => {
  try {
    const name = req.params.id;
    let status = req.query.status;

    const invites =
      status !== undefined
        ? await Invites.find({
            reciever: name,
            status,
          })
        : await Invites.find({
            reciever: name,
          }).select("status  inviter");

    if (!invites || invites.length <= 0) {
      return res.status(404).json({
        error: "You dont have invites .",
      });
    }
    return res.json({ invites }).status(201);
  } catch (error) {
    return res.status(501).json({
      Error: "Internal server error",
      Message: "Something went wrong",
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

    if (!inviteInstance || undefined || !status) {
      return res.status(404).json({ error: "Not found" });
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
      Error: "Internal server error",
      Message: "Something went wrong",
    });
  }
});

route.post("/invites", async (req: Request, res: Response) => {
  try {
    const user = await Users.findOne({
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
    }).exec();

    const findInvites = await Invites.findOne({
      id: user._id,
      reciever: req.body.reciever,
      inviter: req.body.inviter,
      $or: [{ status: "recieved" }, { status: "accepted" }],
    }).exec();
    //check if findInvites and checkInviteInstance are equal
    if (findInvites && checkInviteInstance) {
      return res.status(409).json({ ERROR: "Already sent" });
    }
    const invites = await new Invites({
      reciever: req.body.reciever,
      inviter: req.body.inviter,
    });
    await invites.save();
    return res.status(201).json({ message: invites });
  } catch (error) {
    res.status(501).json({
      Error: "Internal server error",
      Message: "Something went wrong",
    });
  }
});

module.exports = route;
