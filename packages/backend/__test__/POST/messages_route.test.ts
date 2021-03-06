import { app } from "../../src/server";
import * as request from "supertest";
import Chats from "../../src/models/chatRoom.model";
const mongoose = require("mongoose");
import { dumyUser, dumyUser2, invitesDumyData } from "../test_dumy_data";
const users = [dumyUser.username, dumyUser2.username];
const chat_id = mongoose.Types.ObjectId();
beforeAll(async () => {
  try {
    await request(app).post("/users/register").send(dumyUser);
    await request(app).post("/users/register").send(dumyUser2);
    const test_chat_room = new Chats({
      _id: chat_id,
      members: users,
    });
    test_chat_room.save();
    return true;
  } catch (error) {
    return false;
  }
});

afterAll(async () => {
  users.forEach(async (element) => {
    await request(app).delete(`/users/${element}`);
  });
});

describe("Sending invite :/:chat_id", () => {
  it("should return 201 Created", async () => {
    await request(app).post(`/messages/${chat_id}`).send({
      chatInstance: chat_id,
      sender: dumyUser.username,
      message: "paprika",
      seenBy: [],
    });
  });
  it("should return 400 Bad Request", async () => {
    const res = await request(app).post(`/messages/${chat_id}`).send({
      chatInstance: chat_id,
      sender: dumyUser.username,
      message: "",
      seenBy: [],
    });
    expect(res.status).toBe(400);
  });
});
