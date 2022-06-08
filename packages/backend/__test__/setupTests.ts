import * as mongoose from "mongoose";
import * as request from "supertest";
import { app } from "../src/server";
import * as data from "./test_dumy_data";
import User from "../src/models/User.model";
import chatRoom from "../src/models/chatRoom.model";

type IUser =
  | {
      user_id: mongoose.Schema.Types.ObjectId;
      Access_token: string;
      Refresh_token: string;
    }
  | Record<string, never>;

const myId = new mongoose.Types.ObjectId();
let user1: IUser;
let user2: IUser;
let user4: IUser;

beforeAll(async () => {
  try {
    await request(app).post("/users").send(data.dumyUser);
    await request(app).post("/users").send(data.dumyUser2);
    await request(app).post("/users").send(data.dumyUser4);

    const login1 = await request(app).post("/auth/login").send({ username: data.dumyUser.username, password: data.dumyUser.password });
    const login2 = await request(app).post("/auth/login").send({ username: data.dumyUser2.username, password: data.dumyUser2.password });
    const login4 = await request(app).post("/auth/login").send({ username: data.dumyUser4.username, password: data.dumyUser4.password });

    user1 = login1.body;
    user2 = login2.body;
    user4 = login4.body;
    console.log(user1, "ganche");

    return true;
  } catch (error) {
    return false;
  }
});

export { user1, user2, user4 };

afterAll(async () => {
  for (const index in data.users) {
    const user_id = await User.findOne({ username: data.users[index].username });
    await User.deleteOne({ username: data.users[index].username });

    user_id && (await chatRoom.deleteMany({ members: user_id._id }));
  }
  await chatRoom.deleteOne({ _id: myId });
});
