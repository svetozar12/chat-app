import { app } from "../../src/server";
const mongoose = require("mongoose");
import * as request from "supertest";
import { dumyUser } from "../test_dumy_data";
let myId = mongoose.Types.ObjectId();
beforeAll(async () => {
  try {
    await request(app).post("/users/register").send(dumyUser);
    return true;
  } catch (error) {
    return false;
  }
});

afterAll(async () => {
  await request(app).delete(`/users/${dumyUser.username}`);
  await request(app).delete(`/chat-room/delete_chat/${myId}`);
});

describe(`Testing endpoint :/chat-room?user_name=${dumyUser.username}`, () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get(`/chat-room?user_name=${dumyUser.username}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("You have active chat-rooms");
  });
  it("should return 404 Not found", async () => {
    const res = await request(app).get(`/chat-room?user_name=NonExistent`);
    expect(res.status).toBe(400);
    expect(res.body.Message).toBe("You don't have chat rooms");
  });
});
