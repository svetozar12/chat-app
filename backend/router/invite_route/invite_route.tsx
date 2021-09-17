const express = require("express");
const route = express.Router();
const createError = require("http-errors");

import { Request, Response } from "express";

const Invites = require("../../models/Invites.model");

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
      const invites = await new Invites({
        type: "POST",
        inviter: req.params.inviter,
        reciever: req.params.reciever,
      });

      await invites.save();

      // if (!invites) {
      //   throw createError(
      //     404,
      //     "Invalid input",
      //     `User ${req.params.reciever} doesnt exist`,
      //   );
      // }
      res.json({ message: invites }).status(204);
    } catch (error) {
      res.send("error");
    }
  },
);

module.exports = route;
