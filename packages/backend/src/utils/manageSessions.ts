import TokenSession from "../models/TokenSession.model";
import expireDate from "./expireAfter";

const manageSessions = async (user_id: string, token: string, expires: string) => {
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
