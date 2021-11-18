import { app } from "../../src/server";
import * as request from "supertest";

describe("Finding invites by username", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get("/invites/test1");
    expect(res.status).toBe(200);
    expect(res.body.invites[0].reciever).toBe("test1");
  });
});

describe("Finding invites by username with status accepted", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get("/invites/test1?status=accepted");
    expect(res.status).toBe(200);
    expect(res.body.invites[0].reciever).toBe("test1");
  });
});

describe("Finding invites by username with status declined", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get("/invites/test1?status=declined");
    expect(res.status).toBe(200);
    expect(res.body.invites[0].reciever).toBe("test1");
  });
});

describe("Bad input/Non existing invites for user", () => {
  it("should return 404 Not Found", async () => {
    const res = await request(app).get("/invites/nonExistent");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("You dont have invites.");
  });
});
