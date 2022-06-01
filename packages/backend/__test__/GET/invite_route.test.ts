import { app } from "../../src/server";
import * as request from "supertest";
import Invites from "../../src/models/Invites.model";
import { ObjectId } from "mongoose";
import { invitesDumyData } from "../test_dumy_data";
import { user1 } from "../setupTests";
interface IElement {
  reciever: string;
  inviter: string;
  status: string;
  _id?: ObjectId;
}
const invitesArr: IElement[] = [];

beforeAll(async () => {
  try {
    invitesDumyData.forEach((element) => {
      const invites = new Invites(element);
      invitesArr.push(invites);
    });

    invitesArr.forEach((element: any) => {
      element.save();
    });
    return true;
  } catch (error) {
    return false;
  }
});

afterAll(async () => {
  try {
    for (const element of invitesDumyData) {
      await Invites.deleteOne(element);
    }
    return true;
  } catch (error) {
    return false;
  }
});

describe("Bad input/Non existing invites for user :/invites/:id/", () => {
  it("should return 404 Not Found", async () => {
    const res = await request(app)
      .get("/invites/nonExistent")
      .set({ Authorization: `Bearer ${user1.Access_token}` });
    expect(res.status).toBe(401);
    expect(res.body.ErrorMsg).toBe("Can't access other users data");
  });
});

describe("Bad input/Non existing invites for user :/invites/inviter/:id/", () => {
  it("should return 404 Not Found", async () => {
    const res = await request(app)
      .get("/invites/inviter/nonExistent")
      .set({ Authorization: `Bearer ${user1.Access_token}` });
    expect(res.status).toBe(401);
    expect(res.body.ErrorMsg).toBe("Can't access other users data");
  });
});
