import getToken from "./getToken";
import { dumyUser } from "../test_dumy_data";
describe("testing function getToken", () => {
  test("returns access and refresh token as an object", async () => {
    const func = await getToken(dumyUser.username, dumyUser.password);
    expect(func).toHaveProperty("Access_token");
    expect(func).toHaveProperty("Refresh_token");
  });

  test("bad input", async () => {
    const func = await getToken("", "");

    expect(func).toHaveProperty("Access_token");
    expect(func).toHaveProperty("Refresh_token");
    expect(func.Access_token).toBe(null);
    expect(func.Refresh_token).toBe(null);
  });
});
