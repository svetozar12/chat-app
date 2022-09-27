import manageSessions from "./manageSessions";
import { user1 } from "../__test__/setupTests";
import TokenSession from "../models/TokenSession.model";

describe("testing manageSessions util function", () => {
  it("valid input", async () => {
    const user_id = String(user1.user_id);
    const token = user1.Access_token;
    await manageSessions(user_id, token, "1s");
    const res = await TokenSession.findOne({ user_id, token });
    expect(res?.token).toBe(token);
  });
});
