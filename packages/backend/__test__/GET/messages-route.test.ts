import { app } from "../../src/server";
import * as request from "supertest";
import { user2 } from "../setupTests";
let chat_id: string;
let message_id: string;

beforeAll(async () => {
  try {
    const chat = await request(app)
      .get(`/chat-room/?user_id=${user2.user_id}`)
      .set({ Authorization: `Bearer ${user2.Access_token}` });
    chat_id = chat.body.contacts[0]._id;

    const message = await request(app)
      .post(`/messages/${chat_id}`)
      .set({ Authorization: `Bearer ${user2.Access_token}` })
      .send({
        user_id: user2.user_id,
        message: "paprika",
      });
    message_id = message.body.messages._id;

    return true;
  } catch (error) {
    return false;
  }
});

afterAll(async () => {
  await request(app)
    .delete(`/chat-room/delete_chat/${chat_id}`)
    .send({ user_id: user2.user_id })
    .set({ Authorization: `Bearer ${user2.Access_token}` });
  await request(app)
    .delete(`/messages/${message_id}`)
    .send({ user_id: user2.user_id })
    .set({ Authorization: `Bearer ${user2.Access_token}` });
});

describe(`Testing endpoint :/messages/:id`, () => {
  it("should return 200 OK", async () => {
    const res = await request(app)
      .get(`/messages/${chat_id}?user_id=${user2.user_id}&&page_number=1&&page_size=10`)
      .set({ Authorization: `Bearer ${user2.Access_token}` });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("You have messages.");
  });
});

describe("Testing endpoind :/messages/invite_id with invalid invite_id", () => {
  it("should return 404 Not found(invalid id)", async () => {
    const res = await request(app)
      .get(`/messages/22ad22eafe2f2422d2de2b22?user_id=e224d&page_number=1&page_size=10`)
      .set({ Authorization: `Bearer ${user2.Access_token}` });
    expect(res.status).toBe(401);
    expect(res.body.ErrorMsg).toBe("Can't access other users data");
  });
});

describe("Invalid body :/messages/invite_id ", () => {
  it("should return 422 empty _id", async () => {
    const res = await request(app)
      .get(`/messages/  ?user_id=e224d&page_number=1&page_size=10`)
      .set({ Authorization: `Bearer ${user2.Access_token}` });
    expect(res.status).toBe(422);
    expect(res.body.ErrorMsg).toBe("chat_id cannot be empty");
  });
  it("should return 422 empty user_id", async () => {
    const res = await request(app)
      .get(`/messages/dawdaw3123123d?user_id=&page_number=1&page_size=10`)
      .set({ Authorization: `Bearer ${user2.Access_token}` });
    expect(res.status).toBe(422);
    expect(res.body.ErrorMsg).toBe("user_id cannot be empty");
  });
  it("should return 422 no user_id", async () => {
    const res = await request(app)
      .get(`/messages/dawdaw3123123d?page_number=1&page_size=10`)
      .set({ Authorization: `Bearer ${user2.Access_token}` });
    expect(res.status).toBe(422);
    expect(res.body.ErrorMsg).toBe("user_id is required field");
  });
  it("should return 422 invalid page_number type", async () => {
    const res = await request(app)
      .get(`/messages/22ad22eafe2f2422d2de2b22?user_id=e224d&page_number=ivan&page_size=10`)
      .set({ Authorization: `Bearer ${user2.Access_token}` });
    expect(res.status).toBe(422);
    expect(res.body.ErrorMsg).toBe("page_number must be of type number");
  });
  it("should return 422 invalid page_size type", async () => {
    const res = await request(app)
      .get(`/messages/22ad22eafe2f2422d2de2b22?user_id=e224d&page_number=1&page_size=greg`)
      .set({ Authorization: `Bearer ${user2.Access_token}` });
    expect(res.status).toBe(422);
    expect(res.body.ErrorMsg).toBe("page_size must be of type number");
  });
});
