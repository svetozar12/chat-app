import { app } from "../../server";
import * as request from "supertest";
import Chats from "../../models/chatRoom.model";
import User from "../../models/User.model";
import * as mongoose from "mongoose";
import { dumyUser, dumyUser2 } from "../test_dumy_data";
import { user1 } from "../setupTests";

const users = [dumyUser.username, dumyUser2.username];
const chat_id = new mongoose.Types.ObjectId();

beforeAll(async () => {
  const test_chat_room = new Chats({
    _id: chat_id,
    members: [dumyUser.username, dumyUser2.username],
  });
  test_chat_room.save();
  return true;
});

afterAll(async () => {
  users.forEach(async (element) => {
    await User.deleteOne({ username: element });
  });
});

describe("Sending message :/:chat_id", () => {
  it("should return 201 Created", async () => {
    await request(app)
      .post(`/messages/${chat_id}`)
      .send({
        user_id: user1.user_id,
        chatInstance: chat_id,
        sender: dumyUser.username,
        message: "paprika",
        seenBy: [],
      })
      .set({ Authorization: `Bearer ${user1.Access_token}` });
  });
  it("should return 400 Bad Request", async () => {
    const res = await request(app)
      .post(`/messages/${chat_id}`)
      .send({
        user_id: user1.user_id,
        chatInstance: chat_id,
        sender: dumyUser.username,
        message: "",
        seenBy: [],
      })
      .set({ Authorization: `Bearer ${user1.Access_token}` });
    expect(res.status).toBe(422);
    expect(res.body.ErrorMsg).toBe("message cannot be an empty field");
  });
});
