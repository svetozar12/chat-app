import { app } from "../../src/server";
import * as request from "supertest";
import { dumyUser2 } from "../test_dumy_data";

beforeAll(async () => await request(app).post("/users").send(dumyUser2));

describe(`Testing endpoint :/users/${dumyUser2.username}`, () => {
  it("should return 200 OK", async () => {
    const res = await request(app).delete(`/users/${dumyUser2.username}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe(`User ${dumyUser2.username} deleted`);
  });
  it("should return 404 not found", async () => {
    const res = await request(app).delete(`/users/nonExistent`);
    expect(res.status).toBe(404);
    expect(res.body.ErrorMsg).toBe(`User: nonExistent wasn't found`);
  });
});
