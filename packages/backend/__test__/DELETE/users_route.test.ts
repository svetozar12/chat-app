import { app } from "../../src/server";
import * as request from "supertest";
import { dumyUser2 } from "../test_dumy_data";
import { user2 } from "../setupTests";

describe(`Testing endpoint :/users/${dumyUser2.username}`, () => {
  it("should return 200 OK", async () => {
    const res = await request(app)
      .delete(`/users/${user2.user_id}`)
      .set({ Authorization: `Bearer ${user2.Access_token}` });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe(`User ${user2.user_id} deleted`);
  });
  it("should return 403 Forbidden", async () => {
    const res = await request(app).delete(`/users/nonExistent`);
    expect(res.status).toBe(403);
    expect(res.body.ErrorMsg).toBe("Forbidden");
  });
});
