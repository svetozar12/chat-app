import signTokens from "../../src/utils/signToken";
import { user1_id } from "../setupTests";
import { dumyUser } from "../test_dumy_data";
import { constants } from "../../src/constants";
describe("testing function signToken", () => {
  test("signing token", async () => {
    const data = { _id: user1_id, username: dumyUser.username, password: dumyUser.password };
    const func = await signTokens(data, constants.ACCESS_TOKEN as string, "1h");
    expect(func).not.toBe(null);
    expect(func).not.toHaveProperty("ErrorMsg");
  });

  test("signing token with invalid params", async () => {
    const data = { _id: "", username: "", password: "" };
    const func: any = await signTokens(data, "invalid secret", "1h");
    expect(func).toHaveProperty("ErrorMsg");
    expect(func.ErrorMsg).toBe("Token has expired or invalid secret");
  });
});
