import { app } from "../src/server";
import * as request from "supertest";

describe("Valid input on login", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get("/users/test1");
    expect(res.status).toBe(200);
    expect(res.body.message.username).toBe("test1");
  });
});

describe("Invalid input on login", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get("/users/11111");
    expect(res.status).toBe(404);
    expect(res.body.ERROR).toBe("Invalid input");
  });
});
