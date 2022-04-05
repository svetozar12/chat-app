import { app } from "../../src/server";
import * as request from "supertest";
import { dumyUser, dumyUser2, invitesDumyData } from "../test_dumy_data";
const users = [dumyUser.username, dumyUser2.username];
beforeAll(async () => {
  try {
    await request(app).post("/users/register").send(dumyUser);
    await request(app).post("/users/register").send(dumyUser2);
    return true;
  } catch (error) {
    return false;
  }
});

afterAll(async () => {
  users.forEach(async (element) => {
    await request(app).delete(`/users/${element}`);
  });
});

describe("Sending invite :/invites", () => {
  it("should return 201 Created", async () => {
    const res = await request(app).post("/invites").send(invitesDumyData[2]);
    expect(res.status).toBe(201);
  });
  it("should return 404 Not found", async () => {
    const res = await request(app).post("/invites").send("Non existent");
    expect(res.status).toBe(404);
  });
  it("should return 409 Already sent invite", async () => {
    const res = await request(app).post("/invites").send(invitesDumyData[2]);
    expect(res.body.ERROR).toBe("Already sent");
    expect(res.status).toBe(409);
  });
  it("should return 409 Sending invites to yourself", async () => {
    const res = await request(app).post("/invites").send(invitesDumyData[3]);
    expect(res.body.ERROR).toBe("Can't send invites to yourself");
    expect(res.status).toBe(409);
  });
});
