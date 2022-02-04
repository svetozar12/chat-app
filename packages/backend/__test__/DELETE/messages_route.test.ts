import { app } from "../../src/server";
import Chats from "../../src/models/chatRoom.model";
import * as request from "supertest";
import {
  dumyUser,
  dumyUser2,
  dumyUser3,
  invitesDumyData,
} from "../test_dumy_data";
const users = [dumyUser.username, dumyUser2.username, dumyUser3.username];
let chat_id: any;
beforeAll(async () => {
  try {
    await request(app).post("/users/register").send(dumyUser);
    await request(app).post("/users/register").send(dumyUser2);
    const test_chat_room = new Chats({
      members: users,
    });
    chat_id = test_chat_room._id;
    test_chat_room.save();
    await request(app)
      .post("/invites?status=accepted")
      .send(invitesDumyData[0]);
    await request(app)
      .post(`/messages/${test_chat_room._id}`)
      .send({ sender: dumyUser.username, message: "testingMsg", seenBy: [] });
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

describe(`Testing endpoint :/users/${dumyUser.username}`, () => {
  it("should return 200 OK", async () => {
    const res = await request(app)
      .delete(`/messages/${chat_id}`)
      .send({ sender: dumyUser.username, message: "testingMsg" });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe(`Message testingMsg has been deleted`);
  });
  it("should return 404 Not found user", async () => {
    const res = await request(app)
      .delete(`/messages/${chat_id}`)
      .send({ sender: "nonExistent", message: "testingMsg" });
    expect(res.status).toBe(404);
    expect(res.body.message).toBe(`User: nonExistent not found`);
  });
  it("should return 404 Not found message", async () => {
    const res = await request(app)
      .delete(`/messages/${chat_id}`)
      .send({ sender: dumyUser.username, message: "nonExistentMessage" });
    expect(res.status).toBe(404);
    expect(res.body.message).toBe(`Message: nonExistentMessage not found`);
  });
});
