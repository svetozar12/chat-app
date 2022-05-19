import { dumyUser } from "../test_dumy_data";
import getUserId from "./getUserId";

describe("testing function getUserId", () => {
  test("returns user_id", async () => {
    const func = await getUserId(dumyUser.username);
    expect(func).not.toBe(null);
  });

  test("returns null", async () => {
    const func = await getUserId("invalid username");
    expect(func).toBe(null);
  });
});
