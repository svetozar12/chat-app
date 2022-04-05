import { app } from "../../src/server";
const mongoose = require("mongoose");
import * as request from "supertest";
import { dumyUser } from "../test_dumy_data";
beforeAll(async () => {
  try {
    await request(app).post("/users/register").send(dumyUser);
    return true;
  } catch (error) {
    return false;
  }
});

afterAll(async () => {
  await request(app).delete(`/users/${dumyUser.username}`);
});

describe(`Testing endpoint :/users/${dumyUser.username}`, () => {
  it("should return 200 OK", async () => {
    const res = await request(app).delete(`/users/${dumyUser.username}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe(`User ${dumyUser.username} deleted`);
  });
  it("should return 404 not found", async () => {
    const res = await request(app).delete(`/users/nonExistent`);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe(`User nonExistent is not found`);
  });
});
