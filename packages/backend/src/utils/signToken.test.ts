import signTokens from "./signToken";
import { constants } from "../constants";
import * as jwt from "jsonwebtoken";

const data = {
  _id: "3214fsef432423432",
  username: "random",
  password: "random",
};

describe("Signing jwt token", () => {
  it("signing token", async () => {
    const token = await signTokens(data, constants.ACCESS_TOKEN, "1h");
    jwt.verify(token as string, constants.ACCESS_TOKEN, (err, decoded: any) => {
      expect(decoded.username).toBe(data.username);
      expect(decoded.password).toBe(data.password);
      expect(decoded._id).toBe(data._id);
    });
  });

  it("signing invalid token", async () => {
    const token = await signTokens(data, "invalid secret", "1h");
    jwt.verify(token as string, constants.ACCESS_TOKEN, (err, decoded: any) => {
      expect(err).toEqual({
        name: "JsonWebTokenError",
        message: "invalid signature",
      });
    });
  });
});
