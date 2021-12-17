import { app } from "../../src/server";
import * as request from "supertest";
import User from "../../src/models/User.model";
import { dumyUser } from "../test_dumy_data";

beforeAll(async () => {
  try {
    const users = new User(dumyUser);
    const { username, password } = users;
    await request(app).post("/users/register").send({ username, password });
    return true;
  } catch (error) {
    return false;
  }
});

afterAll(async () => {
  await request(app).delete("/users/TestingUser");
});

describe("Passing valid username and password", () => {
  it("should return 201 Created", async () => {
    await request(app).post("/auth/login").send(dumyUser).expect(201);
  });
});

describe("Passing invalid username and password", () => {
  it("should return 400 Bad request", async () => {
    await request(app)
      .post("/auth/login")
      .send({ username: "WrongUser", password: "wrongPassword" })
      .expect(400);
  });
});
