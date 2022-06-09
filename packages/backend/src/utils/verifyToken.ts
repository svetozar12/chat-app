import * as jwt from "jsonwebtoken";
import { CustomError } from "./custom-error.model";

/**
 * signTokens utility function
 *
 * @param token is an jwt token which keeps some kind of data
 * @param secret is the jwt secret
 */

const verifyToken = (token: string, secret: string) => {
  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) return CustomError.forbidden("Token has expired or invalid secret");
    return decoded;
  });
};

export default verifyToken;
