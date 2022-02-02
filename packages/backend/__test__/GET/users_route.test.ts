import { app } from "../../src/server";
import * as request from "supertest";
import { dumyUser } from "../test_dumy_data";
let jwt: string;

beforeAll(async () => {
  try {
    await request(app).post("/users/register").send(dumyUser);
    const res: any = await request(app)
      .post("/auth/login")
      .send({ username: dumyUser.username, password: dumyUser.password });
    jwt = res.body.Access_token;
    return true;
  } catch (error) {
    return false;
  }
});

afterAll(async () => {
  try {
    await request(app).delete(`/users/${dumyUser.username}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
});

describe("Return user and password :/auth/user", () => {
  it("should return 501 server error", async () => {
    const res = await request(app)
      .get("/auth/user")
      .set("Authorization", `Bearer ${jwt}`)
      .expect(200);
  });
});

describe("Passing invalid jwt :/auth/user", () => {
  it("should return 200 OK", async () => {
    await request(app)
      .get("/auth/user")
      .set("Authorization", `Bearer invalidjwt`)
      .expect(501);
  });
});
