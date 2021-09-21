const express = require("express");
const route = express.Router();

import { Request, Response } from "express";

const Invites = require("../../models/Invites.model");
const Users = require("../../models/User.model");

route.get("/invites/:id/", async (req: Request, res: Response) => {
  //Doesnt work without query
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
      return res
        .status(404)
        .json({
          error: "You dont have invites or this this account doesn't exist.",
        });
    }
    res.json({ invites }).status(201);
  } catch (error) {
    return res.status(501).json({ error: "error" });
  }
});

route.put("/invites", async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const status = req.body.status;

    const inviteInstance = await Invites.findOne({
      id,
    }).exec();

    console.log(inviteInstance);

    if (!inviteInstance || undefined) {
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
    res.status(501).send({ error: "error" });
  }
});
// end of accept and ignore put requsts

route.post("/invites", async (req: Request, res: Response) => {
  try {
    const user = await Users.findOne({
      username: req.body.reciever,
    });

    const checkInviteInstance = await Invites.findOne({
      id: user._id,
      reciever: req.body.reciever,
      inviter: req.body.inviter,
      status: "recieved",
    });
    const findInvites = await Invites.findOne({
      id: user._id,
      reciever: req.body.reciever,
      inviter: req.body.inviter,
      status: "recieved",
    });
    //check if findInvites and checkInviteInstance are equal
    if (findInvites && checkInviteInstance) {
      return res.status(409).json({ ERROR: "Already sent" });
    }
    if (!user) {
      return res.status(404).json({ ERROR: "User Not found" });
    }
    const invites = await new Invites({
      reciever: req.body.reciever,
      inviter: req.body.inviter,
    });
    await invites.save();
    return res.status(201).json({ message: invites });
  } catch (error) {
    return res.status(501).send("error");
  }
});

module.exports = route;
