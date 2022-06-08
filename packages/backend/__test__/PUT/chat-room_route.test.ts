import { app } from "../../src/server";
import Chats from "../../src/models/chatRoom.model";
import * as request from "supertest";
const mongoose = require("mongoose");
import { dumyUser, dumyUser2, invitesDumyData } from "../test_dumy_data";
const users = [dumyUser.username, dumyUser2.username];
let chat_id = mongoose.Types.ObjectId();
let invalid_id = "22fbf22222f222ce222222c2";
beforeAll(async () => {
  try {
    await request(app).post("/users/register").send(dumyUser);
    await request(app).post("/users/register").send(dumyUser2);
    const test_chat_room = new Chats({
      _id: chat_id,
      members: users,
    });
    chat_id = test_chat_room._id;
    test_chat_room.save();
    await request(app).post("/invites?status=accepted").send(invitesDumyData[0]);
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

describe(`Testing endpoint :/chat-room/:chat_id`, () => {
  it("should return 200 OK adding users", async () => {
    const res = await request(app).put(`/chat-room/${chat_id}`).send({ usernames: users });
    console.log(res.body, chat_id);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe(`Chat-room members were updated`);
  });
});
