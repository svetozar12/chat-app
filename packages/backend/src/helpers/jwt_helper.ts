import * as jwt from "jsonwebtoken";
import * as createError from "http-errors";
import jwtDecode from "jwt-decode";

export const verifyToken = (token: string, secret: string) => {
  if (!token) return "";

  const bearer = token.split(" ");
  const bearerToken = bearer[1];
  //if bearer Header isn't undefined seperates JWT from Bearer and later on use method jwt.verify() to verify the jwt
  const decoded: { username: string; password: string; iat: number; exp: number } = jwtDecode(bearerToken);
  jwt.verify(bearerToken, secret, (err, token) => {
    if (err) {
      console.log(token);

      console.log(err);

      throw new Error("You don't have permission to do that !");
    }
  });
  return decoded.username;
};

export const signTokens = (
  data: {
    username: string;
    password: string;
  },
  secret: string,
  expires: string,
) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ ...data, expiresIn: expires }, secret, (err: any, token: any) => {
      if (err) {
        return reject(createError(403, "Token has expired"));
      }
      return resolve(token);
    });
  });
};
