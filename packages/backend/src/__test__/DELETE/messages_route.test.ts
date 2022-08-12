import { app } from "../../server";
import * as request from "supertest";
import { dumyUser } from "../test_dumy_data";
import { user1 } from "../setupTests";
let chat_id: string;
let message_id: string;
// .set({ Authorization: `Bearer ${user2.Access_token}` });

beforeEach(async () => {
  try {
    const chat = await request(app)
      .get(`/chat-room?user_id=${user1.user_id}`)
      .set({ Authorization: `Bearer ${user1.Access_token}` });
    chat_id = chat.body.contacts[0]._id;

    const message = await request(app)
      .post(`/messages/${chat_id}`)
      .send({
        user_id: user1.user_id,
        message: "paprika",
      })
      .set({ Authorization: `Bearer ${user1.Access_token}` });
    message_id = message.body.messages._id;
    return true;
  } catch (error) {
    return false;
  }
});

afterEach(async () => {
  await request(app)
    .delete(`/chat-room/${chat_id}`)
    .set({ Authorization: `Bearer ${user1.Access_token}` });
  await request(app)
    .delete(`/messages/${message_id}`)
    .set({ Authorization: `Bearer ${user1.Access_token}` });
});

describe(`Testing endpoint :/users/${dumyUser.username}`, () => {
  it("should return 200 OK", async () => {
    const res = await request(app)
      .delete(`/messages/${message_id}`)
      .send({ user_id: user1.user_id })
      .set({ Authorization: `Bearer ${user1.Access_token}` });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe(`Message has been deleted`);
  });

  it("should return 404 Not found message", async () => {
    const res = await request(app)
      .delete(`/messages/${313123123123}`)
      .send({ user_id: user1.user_id })
      .set({ Authorization: `Bearer ${user1.Access_token}` });
    expect(res.status).toBe(404);
    expect(res.body.ErrorMsg).toBe("Message wasn't found !");
  });
});
