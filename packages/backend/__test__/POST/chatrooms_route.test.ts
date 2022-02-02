import { app } from "../../src/server";
import * as request from "supertest";
const mongoose = require("mongoose");
import {
  dumyUser,
  dumyUser2,
  dumyUser3,
  invitesDumyData,
} from "../test_dumy_data";
const users = [dumyUser.username, dumyUser2.username, dumyUser3.username];
let invite_id: any;
beforeAll(async () => {
  try {
    await request(app).post("/users/register").send(dumyUser);
    await request(app).post("/users/register").send(dumyUser2);
    await request(app).post("/users/register").send(dumyUser3);
    const res = await request(app).post("/invites").send(invitesDumyData[0]);
    invite_id = res.body.message._id;
    await request(app).post("/invites").send({
      reciever: "TestingUser1",
      inviter: "TestingUser3",
      status: "recieved",
    });
    await request(app)
      .post("/invites?status=accepted")
      .send(invitesDumyData[0]);
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

describe("Creating chat-room :/chat-room", () => {
  it("should return 201 Created", async () => {
    const res = await request(app).put("/chat-room").send({
      user1: dumyUser.username,
      user2: dumyUser2.username,
      id: invite_id,
    });
    expect(res.status).toBe(201);
    console.log(res.body);
  });
  it("should return 404 User Not found", async () => {
    const res = await request(app)
      .post("/chat-room")
      .send({ user1: "nonExistent1", user2: "nonExistent2" });
    expect(res.status).toBe(404);
  });
  it("should return 404 Invite Not found", async () => {
    const res = await request(app)
      .post("/chat-room")
      .send({ user1: dumyUser3.username, user2: dumyUser.username });
    expect(res.status).toBe(404);
  });
});

describe("Creating group chat :/invites/group-chat", () => {
  it("should return 201 Created", async () => {
    const res = await request(app)
      .post("/invites/group-chat")
      .send({ usersData: users });
    expect(res.status).toBe(201);
  });
  it("should return 404 Not found", async () => {
    const res = await request(app)
      .post("/invites/group-chat")
      .send({ usersData: ["nonExistent1", "nonExistent2"] });
    expect(res.status).toBe(404);
  });
});
