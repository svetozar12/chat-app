import { app } from "../../src/server";
import * as request from "supertest";
import { invitesDumyData } from "../test_dumy_data";
import Invites from "../../src/models/Invites.model";
import { user1, user2 } from "../setupTests";

afterAll(async () => {
  await Invites.deleteOne(invitesDumyData[2]);
  await Invites.deleteOne(invitesDumyData[3]);
  await Invites.deleteOne(invitesDumyData[4]);
});

describe("Sending invite :/invites", () => {
  it("should return 201 Created", async () => {
    const res = await request(app)
      .post("/invites")
      .set({ Authorization: `Bearer ${user2.Access_token}` })
      .send({ reciever: invitesDumyData[0].reciever, user_id: user2.user_id });
    expect(res.status).toBe(201);
  });
  it("should return 404 Not found", async () => {
    const res = await request(app)
      .post("/invites")
      .set({ Authorization: `Bearer ${user1.Access_token}` })
      .send({ reciever: "nonExistent", user_id: user1.user_id });
    expect(res.status).toBe(404);
  });
  it("should return 409 Already sent invite", async () => {
    await request(app)
      .post("/invites")
      .send({ reciever: invitesDumyData[2].inviter, user_id: user1.user_id })
      .set({ Authorization: `Bearer ${user1.Access_token}` });
    const res = await request(app)
      .post("/invites")
      .send({ reciever: invitesDumyData[2].inviter, user_id: user1.user_id })
      .set({ Authorization: `Bearer ${user1.Access_token}` });
    console.log(res.body, "dis");

    expect(res.body.ErrorMsg).toBe("Invite is already sent !");
    expect(res.status).toBe(409);
  });
  it("should return 409 Sending invites to yourself", async () => {
    const res = await request(app)
      .post("/invites")
      .send({ reciever: invitesDumyData[0].reciever, user_id: user1.user_id })
      .set({ Authorization: `Bearer ${user1.Access_token}` });
    expect(res.body.ErrorMsg).toBe("Can't send invites to yourself !");
    expect(res.status).toBe(409);
  });
});
