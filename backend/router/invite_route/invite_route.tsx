const express = require("express");
const route = express.Router();

import { Request, Response } from "express";

const Invites = require("../../models/Invites.model");
const Users = require("../../models/User.model");

route.get("/invites/:id/", async (req: Request, res: Response) => {
  //Doesnt work without query
  try {
    const id = req.body.id;
    const status = req.query.status;

    const invites = await Invites.find({
      reciever: id,
      status: status,
    }).exec();
    if (!invites || invites === {}) {
      return res.status(404).json({ error: "Not found" });
    }
    res.json({ invites }).status(201);
  } catch (error) {
    return res.status(501).json({ error: "error" });
  }
});

route.put("/invites", async (req: Request, res: Response) => {
  try {
    const reciever = req.body.reciever;
    const inviter = req.body.inviter;
    const status = req.body.status;

    const inviteInstance = await Invites.findOne({
      reciever,
      inviter,
    }).exec();

    if (!inviteInstance || undefined) {
      return res.status(404).json({ error: "Not found" });
    }

    const updateStatus = await Invites.findByIdAndUpdate(
      inviteInstance._id,
      {
        status,
      },
      { new: true },
    ).exec();

    return res.json({ message: updateStatus });
  } catch (error) {
    return res.status(501).json({ error: "error" });
  }
});
// end of accept and ignore put requsts

route.post("/invites", async (req: Request, res: Response) => {
  try {
    const user1 = await Users.findOne({
      username: req.body.inviter,
    }).exec();
    const user2 = await Users.findOne({
      username: req.body.reciever,
    }).exec();

    const checkInviteInstance = await Invites.findOne({
      inviter: req.body.inviter,
      reciever: req.body.reciever,
      status: "accepted",
    }).exec();

    const findInvites = await Invites.findOne({
      inviter: req.body.inviter,
      reciever: req.body.reciever,
      status: "recieved",
    });

    if (findInvites || checkInviteInstance) {
      return res.status(409).json({ error: "Already sent" });
    }

    if (!user1 || !user2) {
      return res.status(404).json({ message: "User Not found" });
    }
    const invites = await new Invites({
      type: "POST",
      inviter: req.body.inviter,
      reciever: req.body.reciever,
      status: "recieved",
    });

    await invites.save();
    return res.status(201).json({ message: invites });
  } catch (error) {
    return res.status(501).send("error");
  }
});

module.exports = route;
