import { client } from "../config/redis_config";

const manageSessions = async (user_id: string, token: string) => {
  const isSession = await client.LRANGE(user_id, 0, 200);
  if (isSession.length === 0 || !isSession) await client.RPUSH(user_id, token);
};

export default manageSessions;
