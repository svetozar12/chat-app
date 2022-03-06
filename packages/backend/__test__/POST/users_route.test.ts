import { app } from "../../src/server";
import * as request from "supertest";
import { dumyUser, dumyUser2 } from "../test_dumy_data";
let refresh_token: any;
const users = [dumyUser.username, dumyUser2.username];
beforeAll(async () => {
  try {
    await request(app).post("/users/register").send(dumyUser);
    const res: any = await request(app).post("/auth/login").send({ username: dumyUser.username, password: dumyUser.password });
    refresh_token = res.body.Refresh_token;
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

describe("Passing valid username and password :/auth/login", () => {
  it("should return 201 Created", async () => {
    const res = await request(app).post("/auth/login").send({ username: dumyUser.username, password: dumyUser.password });
    expect(res.status).toBe(201);
  });
});

describe("Passing invalid username and password :/auth/login", () => {
  it("should return 400 Bad request", async () => {
    const res = await request(app).post("/auth/login").send({ username: "WrongUser", password: "wrongPassword" });
    expect(res.body.message).toBe("User not registered");
    expect(res.status).toBe(400);
  });
});

describe("Registering user :/users/register", () => {
  it("should return 201 New content", async () => {
    const res = await request(app).post("/users/register").send(dumyUser2);
    expect(res.body.message).toBe(`User ${dumyUser2.username} created`);
    expect(res.status).toBe(201);
  });
});

describe("Passing valid refresh-token", () => {
  it("should return 201 Created", async () => {
    const res = await request(app).post("/auth/refresh").send({ refresh_token });
    expect(res.body.username).toBe(dumyUser.username);
    expect(res.status).toBe(201);
  });
});

describe("Passing invalid refresh-token", () => {
  it("should return 501 Internal server error", async () => {
    const res = await request(app).post("/auth/refresh").send({ refresh_token: "invalid" });
    expect(res.body.ErrorMsg).toBe("Token has expired");
    expect(res.status).toBe(501);
  });
});
