const express = require("express");
const route = express.Router();
const createError = require("http-errors");

import { Request, Response } from "express";

const Invites = require("../../models/Invites.model");
const Users = require("../../models/User.model");

route.get("/invites", async (req: Request, res: Response) => {
  try {
    const invites = await Invites.find({ status: "recieved" }).exec();
    if (!invites || undefined || invites === {}) {
      res.status(404).json({ error: "Not found" });
      throw Error;
    }
    res.json({ message: invites }).status(201);
  } catch (error) {
    res.status(501).json({ error: "error" });
  }
});

// accept and ignore put requests
route.put("");
// end of accept and ignore put requsts

route.post(
  "/invites/:inviter/:reciever",
  async (req: Request, res: Response) => {
    try {
      const user1 = await Users.findOne({
        username: req.params.inviter,
      }).exec();
      const user2 = await Users.findOne({
        username: req.params.reciever,
      }).exec();

      const findInvites = await Invites.findOne({
        inviter: req.params.inviter,
        reciever: req.params.reciever,
        status: "recieved",
      });
      console.log("mario", findInvites);
      if (findInvites) {
        res.status(409).json({ error: "Already sent" });
        throw Error;
      }

      if (!user1 || !user2 || undefined) {
        res.status(404).send("404 Not found");
        throw Error;
      }
      const invites = await new Invites({
        type: "POST",
        inviter: req.params.inviter,
        reciever: req.params.reciever,
        status: "recieved",
      });
      await invites.save();
      res.status(201).json({ message: invites });
      res.send("hi");
    } catch (error) {
      res.status(501).send("error");
    }
  },
);

module.exports = route;
