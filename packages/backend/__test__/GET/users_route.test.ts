import { app } from "../../src/server";
import * as request from "supertest";
import User from "../../src/models/User.model";
import { dumyUser } from "../test_dumy_data";
let jwt: string;

beforeAll(async () => {
  try {
    const users = new User(dumyUser);
    const { username, password } = users;
    await request(app).post("/users/register").send({ username, password });
    const res: any = await request(app)
      .post("/auth/login")
      .send({ username, password });
    jwt = res.body.Access_token;

    return true;
  } catch (error) {
    return false;
  }
});

afterAll(async () => {
  await request(app).delete("/users/TestingUser");
});

afterAll(async () => {
  try {
    await User.deleteMany({ username: "TestUser" });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
});

describe("Return user and password", () => {
  it("should return 501 server error", async () => {
    await request(app)
      .get("/auth/user")
      .set("Authorization", `Bearer ${jwt}`)
      .expect(200);
  });
});

describe("Passing invalid jwt", () => {
  it("should return 200 OK", async () => {
    await request(app)
      .get("/auth/user")
      .set("Authorization", `Bearer invalidjwt`)
      .expect(501);
  });
});
