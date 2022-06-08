import * as jwt from "jsonwebtoken";
import { CustomError } from "./custom-error.model";

const verifyToken = (token: string, secret: string) => {
  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) return CustomError.forbidden("Token has expired or invalid secret");
    return decoded;
  });
};

export default verifyToken;
