import * as request from "supertest";
import { app } from "../../src/server";
// used for tests
const getToken = async (username: string, password: string): Promise<{ Access_token: string; Refresh_token: string }> => {
  const login = await request(app).post("/auth/login").send({ username, password });
  return { Access_token: login.body.Access_token || null, Refresh_token: login.body.Refresh_token || null };
};

export default getToken;
