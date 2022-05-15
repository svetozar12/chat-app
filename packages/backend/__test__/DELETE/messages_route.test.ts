import { app } from "../../src/server";
import Chats from "../../src/models/chatRoom.model";
import * as request from "supertest";
import { dumyUser, dumyUser2, dumyUser3 } from "../test_dumy_data";
let chat_id: string;
let message_id: string;

beforeEach(async () => {
  try {
    const chat = await request(app).get(`/chat-room?user_name=${dumyUser.username}`);
    chat_id = chat.body.contacts[0]._id;

    const message = await request(app).post(`/messages/${chat_id}`).send({
      sender: dumyUser.username,
      message: "paprika",
      seenBy: [],
    });
    message_id = message.body.messages._id;
    return true;
  } catch (error) {
    return false;
  }
});

afterEach(async () => {
  await request(app).delete(`/chat-room/delete_chat/${chat_id}`);
  await request(app).delete(`/messages/${message_id}`);
});

describe(`Testing endpoint :/users/${dumyUser.username}`, () => {
  it("should return 200 OK", async () => {
    const res = await request(app).delete(`/messages/${message_id}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe(`Message  has been deleted`);
  });

  it("should return 404 Not found message", async () => {
    const res = await request(app).delete(`/messages/${313123123123}`);
    expect(res.status).toBe(404);
    expect(res.body.ErrorMsg).toBe("Message wasn`t found !");
  });
});
