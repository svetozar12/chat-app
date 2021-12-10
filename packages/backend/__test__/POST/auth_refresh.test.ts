import { app } from "../../src/server";
import * as request from "supertest";
import User from "../../src/models/User.model";
import { dumyUser } from "../test_dumy_data";

let refresh_token: string;
beforeAll(async () => {
  try {
    const users = new User(dumyUser);
    const { username, password } = users;
    await request(app).post("/users/register").send({ username, password });
    const res: any = await request(app)
      .post("/auth/login")
      .send({ username, password });
    refresh_token = res.body.Refresh_token;
    return true;
  } catch (error) {
    return false;
  }
});

afterAll(async () => {
  await request(app).delete("/users/TestingUser");
});

describe("Passing valid refresh-token", () => {
  it("should return 201 Created", async () => {
    await request(app)
      .post("/auth/refresh")
      .send({ refresh_token })
      .expect(201);
  });
});

describe("Passing invalid refresh-token", () => {
  it("should return 201 Created", async () => {
    await request(app)
      .post("/auth/refresh")
      .send({ refresh_token: "invalid" })
      .expect(501);
  });
});
