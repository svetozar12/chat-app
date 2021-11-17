import { app } from "../../src/server";
import * as request from "supertest";

describe("Finding invites by username", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get("/invites/test1");
    expect(res.status).toBe(200);
    // expect(res.body.message.username).toBe("test1");
  });
});
