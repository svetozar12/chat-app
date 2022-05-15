import { app } from "../../src/server";
import chatRoom from "../../src/models/chatRoom.model";
import Invites from "../../src/models/Invites.model";
import * as request from "supertest";
import * as mongoose from "mongoose";
import { dumyUser, dumyUser2 } from "../test_dumy_data";

let invite_id: string;
let chat_id: string;
const invalid_id = new mongoose.Types.ObjectId();

beforeAll(async () => {
  const res = await request(app).get(`/chat-room?user_name=${dumyUser.username}`);
  chat_id = res.body.contacts[0]._id;
});

afterAll(async () => {
  await Invites.deleteOne({ _id: invite_id });
  await chatRoom.deleteOne({ _id: chat_id });
});

describe(`Testing endpoint :/chat-room/:chat_id`, () => {
  it("should return 200 OK adding users", async () => {
    const res = await request(app)
      .put(`/chat-room/${chat_id}`)
      .send({ usernames: [dumyUser2.username] });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe(`Chat-room members were updated`);
  });

  it("should return 200 OK removing user", async () => {
    const res = await request(app).put(`/chat-room/${chat_id}`).send({ username: dumyUser2.username });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe(`Chat-room members were updated`);
  });

  it("should return 404 Not found invalid id", async () => {
    const res = await request(app).put(`/chat-room/111142db62d7dc1111bd1d11`).send({ username: dumyUser2.username });

    expect(res.status).toBe(404);
    expect(res.body.ErrorMsg).toBe(`Chat room not found .`);
  });
});
