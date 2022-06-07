import { app } from "../../src/server";
import * as request from "supertest";
import { dumyUser, dumyUser2 } from "../test_dumy_data";
import * as mongoose from "mongoose";
import Invites from "../../src/models/Invites.model";
import { user2 } from "../setupTests";

let chat_id: string;
const invalid_id = new mongoose.Types.ObjectId();
let invite_id: string;
beforeAll(async () => {
  const res = await request(app)
    .post("/invites")
    .set({ Authorization: `Bearer ${user2.Access_token}` })
    .send({ user_id: user2.user_id, reciever: dumyUser.username });

  const updateInvite = await request(app)
    .put(`/invites/${res.body.message._id}`)
    .set({ Authorization: `Bearer ${user2.Access_token}` })
    .send({ user_id: user2.user_id, status: "accepted" });
  invite_id = updateInvite.body.message._id;
  const chat = await request(app)
    .post("/chat-room")
    .set({ Authorization: `Bearer ${user2.Access_token}` })
    .send({ user_id: user2.user_id, invite_id, user1: dumyUser.username, user2: dumyUser2.username });
  chat_id = chat.body.Message._id;
});

afterAll(async () => {
  await Invites.deleteMany({ user_id: user2.user_id, reciever: dumyUser.username });
});

describe(`Testing endpoint :/chat-room/:id DELETE`, () => {
  it("should return 200 OK", async () => {
    const res = await request(app)
      .delete(`/chat-room/${chat_id}`)
      .set({ Authorization: `Bearer ${user2.Access_token}` })
      .send({ user_id: user2.user_id });

    expect(res.status).toBe(200);
    expect(res.body.Message).toBe(`Chat_room ${chat_id} is deleted`);
  });
  it("should return 404 Not found", async () => {
    const res = await request(app)
      .delete(`/chat-room/${invalid_id}`)
      .set({ Authorization: `Bearer ${user2.Access_token}` })
      .send({ user_id: user2.user_id });
    expect(res.status).toBe(404);
    expect(res.body.ErrorMsg).toBe(`Chat room ${invalid_id} not found !`);
  });
});

describe(`Testing endpoint :/chat-room/:id DELETE`, () => {
  it("should return 422 Unprocessable Entity", async () => {
    const res = await request(app)
      .delete(`/chat-room/d`)
      .set({ Authorization: `Bearer ${user2.Access_token}` })
      .send({ user_id: "" });

    expect(res.status).toBe(422);
    expect(res.body.ErrorMsg).toBe(`user_id cannot be empty`);
  });
  it("should return 422 Unprocessable Entity", async () => {
    const res = await request(app)
      .delete(`/chat-room/`)
      .set({ Authorization: `Bearer ${user2.Access_token}` });

    expect(res.status).toBe(422);
    expect(res.body.ErrorMsg).toBe(`user_id is required field`);
  });
});
