import { app } from "../../src/server";
import * as request from "supertest";
import { dumyUser } from "../test_dumy_data";
let jwt: string;

beforeAll(async () => {
  try {
    const res: any = await request(app).post("/auth/login").send({ username: dumyUser.username, password: dumyUser.password });
    jwt = res.body.Access_token;

    return true;
  } catch (error) {
    return false;
  }
});

describe("Return user and password :/auth/user", () => {
  it("should return 200 ok", async () => {
    const res = await request(app).get("/auth/user").set("Authorization", `Bearer ${jwt}`);

    expect(res.body.authData.username).toBe("TestingUser1");
    expect(res.body.authData.password).toBe("TestingUser1");
    expect(res.status).toBe(200);
  });
});

describe("Passing invalid jwt :/auth/user", () => {
  it("should return 403 forbidden", async () => {
    const res = await request(app).get("/auth/user").set("Authorization", `Bearer invalidjwt`);
    expect(res.body.ErrorMsg).toBe("Token has expired");
    expect(res.status).toBe(403);
  });
});
