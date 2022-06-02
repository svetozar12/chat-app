import { CustomError } from "./custom-error.model";
import * as jwt from "jsonwebtoken";
import manageSessions from "./manageSessions";

/**
 * signTokens utility function
 *
 * @param data is an object which is containing username and password
 * @param secret is the jwt secret
 * @param expires when will the token expire
 */

const signTokens = (
  data: {
    _id: string;
    username: string;
    password: string;
  },
  secret: string,
  expires: string,
) => {
  return new Promise((resolve, reject) => {
    jwt.sign(data, secret, { expiresIn: expires }, async (err, token) => {
      if (err) {
        return reject(CustomError.forbidden("Token has expired or invalid secret"));
      }
      return resolve(token);
    });
  });
};

export default signTokens;
