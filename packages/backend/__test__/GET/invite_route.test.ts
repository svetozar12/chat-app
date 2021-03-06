import { app } from "../../src/server";
import * as request from "supertest";
import Invites from "../../src/models/Invites.model";
import { ObjectId } from "mongoose";
import { tests, invitesDumyData } from "../test_dumy_data";

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
    await Invites.deleteOne({
      reciever: "TestingUser1",
      inviter: "testingUser2",
      status: "accepted",
    });

    return true;
  } catch (error) {
    return false;
  }
});

tests.forEach((element) => {
  describe(element.describe, () => {
    it("should return 200 OK :/invites/:id/", async () => {
      const res = await request(app).get(element.request);
      expect(res.status).toBe(200);
      expect(res.body.invites[0].reciever).toBe("TestingUser1");
    });
  });
});

describe("Bad input/Non existing invites for user :/invites/:id/", () => {
  it("should return 404 Not Found", async () => {
    const res = await request(app).get("/invites/nonExistent");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("You dont have invites.");
  });
});

tests.forEach((element) => {
  describe(element.describe, () => {
    it("should return 200 OK :/invites/inviter/:id/", async () => {
      const res = await request(app).get(element.request);
      expect(res.status).toBe(200);
      expect(res.body.invites[0].reciever).toBe("TestingUser1");
    });
  });
});

describe("Bad input/Non existing invites for user :/invites/inviter/:id/", () => {
  it("should return 404 Not Found", async () => {
    const res = await request(app).get("/invites/inviter/nonExistent");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("You dont have accepted invites .");
  });
});
