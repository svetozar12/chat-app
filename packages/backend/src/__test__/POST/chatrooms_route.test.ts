import { app } from "../../server";
import * as request from "supertest";
import { dumyUser, dumyUser2, dumyUser3, dumyUser4, users } from "../test_dumy_data";
import * as mongoose from "mongoose";
import Invites from "../../models/Invites.model";
import chatRoom from "../../models/chatRoom.model";
import { user1 } from "../setupTests";

let invite_id: string;
let chat_id: string;
const invalid_id = new mongoose.Types.ObjectId();

beforeAll(async () => {
  const res = await request(app)
    .post("/invites")
    .set({ Authorization: `Bearer ${user1.Access_token}` })
    .send({ user_id: user1.user_id, reciever: dumyUser2.username });
  const updateInvite = await request(app)
    .put(`/invites/${res.body.message._id}`)
    .set({ Authorization: `Bearer ${user1.Access_token}` })
    .send({ user_id: user1.user_id, status: "accepted" });

  invite_id = updateInvite.body.message._id;
});

afterAll(async () => {
  await Invites.deleteOne({ _id: invite_id });
  await chatRoom.deleteOne({ _id: chat_id });
});

describe("Creating chat-room :/chat-room", () => {
  it("should return 201 Created", async () => {
    const res = await request(app)
      .post("/chat-room")
      .set({ Authorization: `Bearer ${user1.Access_token}` })
      .send({
        user_id: user1.user_id,
        invite_id: invite_id,
        user1: dumyUser.username,
        user2: dumyUser2.username,
      });

    chat_id = res.body.Message._id;
    expect(res.body.message).toBe("chat-room was created");
    expect(res.status).toBe(201);
  });

  it("should return 404 User Not found", async () => {
    const res = await request(app)
      .post("/chat-room")
      .set({ Authorization: `Bearer ${user1.Access_token}` })
      .send({ user_id: user1.user_id, invite_id, user1: "nonExistent1", user2: "nonExistent2" });
    expect(res.text).toBe('{"ErrorMsg":"User nonExistent1 not found"}');
    expect(res.status).toBe(404);
  });

  it("should return 404 Invite Not found", async () => {
    const res = await request(app)
      .post("/chat-room")
      .set({ Authorization: `Bearer ${user1.Access_token}` })
      .send({
        user_id: user1.user_id,
        invite_id: invalid_id,
        user1: dumyUser2.username,
        user2: dumyUser.username,
      });
    expect(res.text).toBe('{"ErrorMsg":"Invite not found"}');
    expect(res.status).toBe(404);
  });
});

describe("Creating group chat :/invites/group-chat", () => {
  it("should return 201 Created", async () => {
    const res = await request(app)
      .post("/invites/group-chat")
      .set({ Authorization: `Bearer ${user1.Access_token}` })
      .send({ usersData: [dumyUser.username, dumyUser2.username, dumyUser4.username] });
    expect(res.body.message).toBe("group-chat was created");
    expect(res.status).toBe(201);
  });
  it("should return 404 Not found", async () => {
    const res = await request(app)
      .post("/invites/group-chat")
      .set({ Authorization: `Bearer ${user1.Access_token}` })
      .send({ usersData: ["nonExistent1", "nonExistent2"] });
    expect(res.text).toBe('{"ErrorMsg":"User nonExistent1 not found"}');
    expect(res.status).toBe(404);
  });
});

describe("Invalid body :/invites/chatroom", () => {
  it("should return 422", async () => {
    const res = await request(app)
      .post("/invites/group-chat")
      .set({ Authorization: `Bearer ${user1.Access_token}` })
      .send({ usersData: "d" });
    expect(res.body.ErrorMsg).toBe("usersData should be of type array");
    expect(res.status).toBe(422);
  });
  it("should return 422", async () => {
    const res = await request(app)
      .post("/invites/group-chat")
      .set({ Authorization: `Bearer ${user1.Access_token}` });
    expect(res.body.ErrorMsg).toBe("usersData is a required field");
    expect(res.status).toBe(422);
  });
});