import TokenSession from "../models/TokenSession.model";
import expireDate from "./expireAfter";
/**
 * manageSessions utility function
 * Creates new document in mongo collection: token_session where we store the session tokens related
 * to one user and expires them when the token is invalid
 *
 * @param user_id is the user_id from the user which logins
 * @param token the tokens that will be passed are access_token and refresh_token
 * @param expires time of expiration ex: 1h,1d
 */

const manageSessions = async (user_id: string, token: string, expires: string) => {
  if (typeof user_id !== "string" || typeof token !== "string" || typeof expires !== "string") return undefined;
  const hours = expires.indexOf("h") !== -1;
  const days = expires.indexOf("d") !== -1;
  let seconds;

  const secondsInDay = 86400;
  const minutesInHour = 60;
  const secondsInMinute = 60;

  if (hours) seconds = Number(expires.split("h")[0]) * minutesInHour * secondsInMinute;
  if (days) seconds = Number(expires.split("d")[0]) * secondsInDay;
  await TokenSession.create({ user_id, token, expireAt: expireDate(expires), expireAfter: seconds });
};

export default manageSessions;
