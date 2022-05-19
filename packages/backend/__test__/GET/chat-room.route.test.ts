import { app } from "../../src/server";
import * as request from "supertest";
import { dumyUser } from "../test_dumy_data";
import { tokens } from "../setupTests";
describe(`Testing endpoint :/chat-room?user_name=${dumyUser.username}`, () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get(`/chat-room?user_name=${dumyUser.username}`);
    expect(res.status).toBe(200);
    expect(res.body.data).toBe("You have active chat-rooms");
  });
  it("should return 404 Not found", async () => {
    const res = await request(app).get(`/chat-room?user_name=NonExistent`);
    expect(res.status).toBe(404);
    expect(res.body.ErrorMsg).toBe("You don't have chat rooms");
  });
});
