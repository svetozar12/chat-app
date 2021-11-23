import { app } from "../../src/server";
import * as request from "supertest";
import User from "../../src/models/User.model";
import "jest";

beforeAll(async () => {
  try {
    const users = new User({ username: "TestUser" });
    users.save();
    return true;
  } catch (error) {
    return false;
  }
});

afterAll(async () => {
  try {
    await User.deleteOne({ username: "TestUser" });
    return true;
  } catch (error) {
    return false;
  }
});

describe("Valid input on login", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get("/users/TestUser");
    expect(res.status).toBe(200);
    expect(res.body.message.username).toBe("TestUser");
  });
});

describe("Invalid input too short input", () => {
  it("should return 409 Conflict", async () => {
    const res = await request(app).get("/users/a");
    expect(res.status).toBe(409);
  });
});

describe("Invalid input too long input", () => {
  it("should return 409 Conflict", async () => {
    const res = await request(app).get(
      "/users/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    );
    expect(res.status).toBe(409);
  });
});
