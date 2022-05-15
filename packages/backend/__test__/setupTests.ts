import * as mongoose from "mongoose";
import * as request from "supertest";
import { app } from "../src/server";
import * as data from "./test_dumy_data";
import User from "../src/models/User.model";
import chatRoom from "../src/models/chatRoom.model";

const myId = new mongoose.Types.ObjectId();
beforeAll(async () => {
  try {
    await request(app).post("/users").send(data.dumyUser);
    await request(app).post("/users").send(data.dumyUser2);
    await request(app).post("/users").send(data.dumyUser4);
    return true;
  } catch (error) {
    return false;
  }
});

afterAll(async () => {
  for (const index in data.users) {
    await User.deleteOne({ username: data.users[index] });
    await chatRoom.deleteOne({ members: [data.users[index]] });
  }
  await chatRoom.deleteOne({ _id: myId });
});
