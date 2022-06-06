import TokenSession from "../models/TokenSession.model";
import expireDate from "./expireAfter";

const manageSessions = async (user_id: string, token: string, expires: string) => {
  await TokenSession.create({ user_id, token, expireAt: expireDate(expires) });
};

export default manageSessions;
