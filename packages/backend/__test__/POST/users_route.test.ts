import { app } from "../../src/server";
import * as request from "supertest";
import { dumyUser, dumyUser3 } from "../test_dumy_data";
import User from "../../src/models/User.model";
import { user1 } from "../setupTests";

afterAll(async () => {
  await User.deleteOne({ username: dumyUser3.username });
});

describe("Passing valid username and password :/auth/login", () => {
  it("should return 201 Created", async () => {
    const res = await request(app).post("/auth/login").send({ username: dumyUser.username, password: dumyUser.password });

    expect(res.status).toBe(201);
  });
});

describe("Passing invalid username and password :/auth/login", () => {
  it("should return 400 Bad request", async () => {
    const res = await request(app).post("/auth/login").send({ username: "WrongUser", password: "wrongPassword" });
    expect(res.body.ErrorMsg).toBe("User: WrongUser is not registered");
    expect(res.status).toBe(400);
  });
});

describe("Registering user :/users", () => {
  it("should return 201 New content", async () => {
    const res = await request(app).post("/users").send(dumyUser3);

    expect(res.body.message).toBe(`User ${dumyUser3.username} created`);
    expect(res.status).toBe(201);
  });
});

describe("Passing valid refresh-token", () => {
  it("should return 201 Created", async () => {
    const res = await request(app)
      .post(`/auth/refresh/${user1.user_id}`)
      .set({ Authorization: `Bearer ${user1.Refresh_token}` })
      .send({ refresh_token: user1.Refresh_token });

    expect(res.body.user_id).toBe(user1.user_id);
    expect(res.status).toBe(201);
  });
});

describe("Passing invalid refresh-token", () => {
  it("should return 403 Forbidden", async () => {
    const res = await request(app)
      .post("/auth/refresh/3123123123")
      .set({ Authorization: `Bearer dawdaw` })
      .send({ refresh_token: "invalid" });
    console.log(res.body, "divan");

    expect(res.body.ErrorMsg).toBe("Token has expired or invalid secret");
    expect(res.status).toBe(403);
  });
});
