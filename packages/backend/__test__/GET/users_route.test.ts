import { app } from "../../src/server";
import * as request from "supertest";
import { user1 } from "../setupTests";

describe("Return user and password :/auth/user", () => {
  it("should return 200 ok", async () => {
    const res = await request(app).get(`/users/${user1.user_id}`).set("Authorization", `Bearer ${user1.Access_token}`);

    expect(res.body.user.username).toBe("TestingUser1");
    expect(res.body.user.email).toBe("TestingUser1@.com");
    expect(res.status).toBe(200);
  });
});

describe("Passing invalid jwt :/user", () => {
  it("should return 403 forbidden", async () => {
    const res = await request(app).get("/users/321312312312").set("Authorization", `Bearer invalidjwt`);

    expect(res.body.ErrorMsg).toBe("Token has expired or invalid secret");
    expect(res.status).toBe(403);
  });
});
