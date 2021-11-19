import { app } from "../../src/server";
import * as request from "supertest";
import Invites from "../../src/models/Invites.model";
import "@types/jest";
import { ObjectId } from "mongoose";

const tests = [
  {
    describe: "Finding invites by username",
    request: "/invites/testingUser1",
  },
  {
    describe: "Finding invites by username with status accepted",
    request: "/invites/testingUser1?status=accepted",
  },
  {
    describe: "Finding invites by username with status declined",
    request: "/invites/testingUser1?status=declined",
  },
];

const invitesDumyData = [
  { reciever: "testingUser1", inviter: "testingUser2", status: "accepted" },
  { reciever: "testingUser1", inviter: "testingUser2", status: "declined" },
  { reciever: "testingUser1", inviter: "testingUser2", status: "recieved" },
];

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
      console.log(element);
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
      reciever: "testingUser1",
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
    it("should return 200 OK", async () => {
      const res = await request(app).get(element.request);
      expect(res.status).toBe(200);
      expect(res.body.invites[0].reciever).toBe("testingUser1");
    });
  });
});

describe("Bad input/Non existing invites for user", () => {
  it("should return 404 Not Found", async () => {
    const res = await request(app).get("/invites/nonExistent");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("You dont have invites.");
  });
});
