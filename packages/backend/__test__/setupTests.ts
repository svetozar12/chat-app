import * as mongoose from "mongoose";
import * as request from "supertest";
import { app } from "../src/server";
import * as data from "./test_dumy_data";
import User from "../src/models/User.model";
import chatRoom from "../src/models/chatRoom.model";
import getToken from "./testUtils/getToken";
import getUserId from "./testUtils/getUserId";
const myId = new mongoose.Types.ObjectId();
let tokens: { Access_token: string; Refresh_token: string };
let user1_id: string;
beforeAll(async () => {
  try {
    await request(app).post("/users").send(data.dumyUser);
    await request(app).post("/users").send(data.dumyUser2);
    await request(app).post("/users").send(data.dumyUser4);

    tokens = await getToken(data.dumyUser.username, data.dumyUser.password);
    user1_id = await getUserId(data.dumyUser.username);
    return true;
  } catch (error) {
    return false;
  }
});

export { tokens, user1_id };

afterAll(async () => {
  for (const index in data.users) {
    await User.deleteOne({ username: data.users[index] });
    await chatRoom.deleteOne({ members: [data.users[index]] });
  }
  await chatRoom.deleteOne({ _id: myId });
});
