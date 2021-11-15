import { app } from "../src/server";
import * as request from "supertest";

describe("GET /users/test1", () => {
  it("should return 200 OK", () => {
    return request(app).get("/users/test1").expect(200);
  });
});
