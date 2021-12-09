import { app } from "../../src/server";
import * as request from "supertest";
import User from "../../src/models/User.model";
let jwt: string;
beforeAll(async () => {
  try {
    const dumyUser = { username: "TestUser", password: "TestUser" };
    const users = new User(dumyUser);
    const res: any = await request(app).post("/auth/login").send(dumyUser);
    jwt = res.Access_token;
    users.save();
    return jwt;
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

describe("Return user and password", () => {
  it("should return 200 OK", async () => {
    try {
      console.log(jwt);

      const res = await request(app)
        .get("/auth/user")
        .set("Authorization", `Bearer ${jwt}`)
        .expect(200);
      return true;
    } catch (error) {
      return false;
    }
  });
});

// describe("Invalid input too short input", () => {
//   it("should return 409 Conflict", async () => {
//     const res = await request(app).get("/users/a");
//     expect(res.status).toBe(409);
//   });
// });

// describe("Invalid input too long input", () => {
//   it("should return 409 Conflict", async () => {
//     const res = await request(app).get(
//       "/users/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
//     );
//     expect(res.status).toBe(409);
//   });
// });
