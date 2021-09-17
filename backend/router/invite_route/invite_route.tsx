const express = require("express");
const route = express.Router();
const createError = require("http-errors");

import { Request, Response } from "express";

const Invites = require("../../models/Invites.model");
const Users = require("../../models/User.model");

route.get("/invites", async (req: Request, res: Response) => {
  try {
    const invites = await Invites.find({}).exec();
    if (!invites || undefined || invites === {}) {
      throw createError(400, "Invalid input", `Users doesnt exist`);
    }
    res.json({ message: invites }).status(201);
  } catch (error) {
    res.json({ error: "error" });
  }
});

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

      if (!user1 || !user2 || undefined) throw Error;
      const invites = await new Invites({
        type: "POST",
        inviter: req.params.inviter,
        reciever: req.params.reciever,
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
