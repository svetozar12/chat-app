import { app } from "../../src/server";
import chatRoom from "../../src/models/chatRoom.model";
import Invites from "../../src/models/Invites.model";
import * as request from "supertest";
import { dumyUser, dumyUser2 } from "../test_dumy_data";
import { user1, user2 } from "../setupTests";

let invite_id: string;
let chat_id: string;

describe(`Testing endpoint :/chat-room/:chat_id`, () => {
  beforeAll(async () => {
    const res = await request(app)
      .get(`/chat-room?user_id=${user1.user_id}`)
      .set({ Authorization: `Bearer ${user1.Access_token}` });
    chat_id = res.body.contacts[0]._id;
  });

  afterAll(async () => {
    await Invites.deleteOne({ _id: invite_id });
    await chatRoom.deleteOne({ _id: chat_id });
  });
  it("should return 200 OK adding users", async () => {
    const res = await request(app)
      .put(`/chat-room/${chat_id}`)
      .set({ Authorization: `Bearer ${user1.Access_token}` })
      .send({ user_id: user1.user_id, usernames: [user2.user_id] });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe(`Chat-room members were updated`);
  });

  it("should return 201 OK removing user and deleting chat room", async () => {
    const res = await request(app)
      .put(`/chat-room/${chat_id}`)
      .set({ Authorization: `Bearer ${user1.Access_token}` })
      .send({ user_id: user1.user_id, username: dumyUser2.username });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe(`deleted chat-room`);
  });

  it("should return 404 Not found invalid id", async () => {
    const res = await request(app)
      .put(`/chat-room/111142db62d7dc1111bd1d11`)
      .set({ Authorization: `Bearer ${user2.Access_token}` })
      .send({ user_id: user2.user_id, username: dumyUser2.username });

    expect(res.status).toBe(404);
    expect(res.body.ErrorMsg).toBe(`Chat room not found .`);
  });
});
