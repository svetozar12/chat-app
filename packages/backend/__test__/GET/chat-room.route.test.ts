import { app } from "../../src/server";
import * as request from "supertest";
import { user1 } from "../setupTests";

describe(`Testing endpoint :/chat-room?user_id=id`, () => {
  it("should return 200 OK", async () => {
    const res = await request(app)
      .get(`/chat-room?user_id=${user1.user_id}`)
      .set({ Authorization: `Bearer ${user1.Access_token}` });
    expect(res.status).toBe(200);
    expect(res.body.data).toBe("You have active chat-rooms");
  });
  it("should return 404 Not found", async () => {
    const res = await request(app)
      .get(`/chat-room?user_name=NonExistent`)
      .set({ Authorization: `Bearer ${user1.Access_token}` });
    expect(res.status).toBe(401);
    expect(res.body.ErrorMsg).toBe("Can't access other users data");
  });
});
