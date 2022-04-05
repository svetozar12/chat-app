import { app } from "../../src/server";
import Chats from "../../src/models/chatRoom.model";
import * as request from "supertest";
import { dumyUser, dumyUser2, invitesDumyData } from "../test_dumy_data";
const users = [dumyUser.username, dumyUser2.username];
let chat_id: any;
let invalid_id = "22fbf22222f222ce222222c2";
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

describe(`Testing endpoint :/chat-room/delete_chat/${chat_id}`, () => {
  it("should return 200 OK", async () => {
    const res = await request(app).delete(`/chat-room/delete_chat/${chat_id}`);
    expect(res.status).toBe(200);
    expect(res.body.Message).toBe(`Chat_room ${chat_id} is deleted`);
  });
  it("should return 404 Not found", async () => {
    const res = await request(app).delete(
      `/chat-room/delete_chat/${invalid_id}`,
    );
    expect(res.status).toBe(404);
    expect(res.body.Message).toBe(`Chat room ${invalid_id} not found !`);
  });
});
