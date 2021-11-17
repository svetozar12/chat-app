import { app } from "../../src/server";
import * as request from "supertest";

describe("Valid input on login", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get("/users/test1");
    expect(res.status).toBe(200);
    expect(res.body.message.username).toBe("test1");
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
