import * as jwt from "jsonwebtoken";
import * as createError from "http-errors";
import jwtDecode from "jwt-decode";
import { client } from "../config/redis_config";
import TokenWL, { ITokenWL } from "../models/TokensWL.model";

const verifyHelper = (bearerToken: string, secret: string) => {
  const decoded: { username: string; password: string; iat: number; exp: number } = jwtDecode(bearerToken);
  jwt.verify(bearerToken, secret, (err, token) => {
    if (err) {
      throw new Error("You don't have permission to do that !");
    }
    return decoded.username;
  });
};

export const verifyToken = async (token: string, secret: string) => {
  if (!token) return "";
  const bearer = token.split(" ");

  const bearerToken = bearer[1];
  const redistToken = await client.get(bearerToken);
  const mongoToken: ITokenWL | null = await TokenWL.findOne();

  if (redistToken === bearerToken) {
    return verifyHelper(bearerToken, secret);
  } else if (mongoToken?.access_token === bearerToken || mongoToken?.refresh_token === bearerToken) {
    return verifyHelper(bearerToken, secret);
  }
  //if bearer Header isn't undefined seperates JWT from Bearer and later on use method jwt.verify() to verify the jwt
  return verifyHelper(bearerToken, secret);
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
    let access_token = "";
    let refresh_token = "";
    jwt.sign({ ...data, expiresIn: expires }, secret, (err: any, token: any) => {
      if (err) {
        return reject(createError(403, "Token has expired"));
      }
      access_token = token;
    });
    jwt.sign({ ...data, expiresIn: expires }, secret, (err: any, token: any) => {
      if (err) {
        return reject(createError(403, "Token has expired"));
      }
      refresh_token = token;
    });
    if (access_token && refresh_token) {
      const token = new TokenWL({ access_token, refresh_token });
      return { access_token: token.access_token, refresh_token: token.refresh_token };
    }
  });
};
