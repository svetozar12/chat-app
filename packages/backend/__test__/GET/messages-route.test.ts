import { app } from "../../src/server";
const mongoose = require("mongoose");
import * as request from "supertest";
import User from "../../src/models/User.model";
import Chats from "../../src/models/chatRoom.model";
import { dumyUser, dumyUser2 } from "../test_dumy_data";
let users: any = [];
let chat_id = mongoose.Types.ObjectId();
let message_id = mongoose.Types.ObjectId();
beforeAll(async () => {
  try {
    const user1 = new User(dumyUser);
    const user2 = new User(dumyUser2);
    users.push(user1, user2);

    const test_chat_room = new Chats({
      _id: chat_id,
      members: [user1, user2],
    });
    test_chat_room.save();
    await request(app).post(`/messages/${chat_id}`).send({
      chatInstance: message_id,
      sender: dumyUser.username,
      message: "paprika",
      seenBy: [],
    });
    return true;
  } catch (error) {
    return false;
  }
});

afterAll(async () => {
  try {
    users.forEach(async (element: string) => {
      await request(app).delete(`/users/${element}`);
    });
    await request(app).delete(`/chat-room/delete_chat/${chat_id}`);
    await request(app).delete(`/messages/${chat_id}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
});

describe(`Testing endpoint :/messages/${message_id}`, () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get(`/messages/${chat_id}?page_number=1&page_size=10`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("You have messages.");
  });
});

describe("Testing endpoind :/messages/chat_id with invalid chat_id", () => {
  it("should return 404 Not found(invalid id)", async () => {
    const res = await request(app).get(`/messages/22ad22eafe2f2422d2de2b22?page_number=1&page_size=10`);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("You don't have messages.");
  });
});
