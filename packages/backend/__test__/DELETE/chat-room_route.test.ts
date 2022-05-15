import { app } from "../../src/server";
import Chats from "../../src/models/chatRoom.model";
import * as request from "supertest";
import { dumyUser, dumyUser2 } from "../test_dumy_data";
import * as mongoose from "mongoose";
import Invites from "../../src/models/Invites.model";

let chat_id: string;
const invalid_id = new mongoose.Types.ObjectId();
let invite_id: string;

beforeAll(async () => {
  const res = await request(app).post("/invites").send({ inviter: dumyUser2.username, reciever: dumyUser.username });
  const updateInvite = await request(app).put("/invites").send({ id: res.body.message._id, status: "accepted" });
  invite_id = updateInvite.body.message._id;
  const chat = await request(app).post("/chat-room").send({ invite_id, user1: dumyUser.username, user2: dumyUser2.username });
  chat_id = chat.body.Message._id;
});

afterAll(async () => {
  await Invites.deleteOne({ _id: invite_id });
});

describe(`Testing endpoint :/chat-room/:id`, () => {
  it("should return 200 OK", async () => {
    const res = await request(app).delete(`/chat-room/${chat_id}`);
    expect(res.status).toBe(200);
    expect(res.body.Message).toBe(`Chat_room ${chat_id} is deleted`);
  });
  it("should return 404 Not found", async () => {
    const res = await request(app).delete(`/chat-room/${invalid_id}`);
    expect(res.status).toBe(404);
    expect(res.body.ErrorMsg).toBe(`Chat room ${invalid_id} not found !`);
  });
});
