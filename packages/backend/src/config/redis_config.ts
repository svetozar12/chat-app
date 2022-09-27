import { constants } from "../constants";
import { createClient } from "redis";

const client = createClient({ url: constants.REDIS_URL });
const redis_connection = async () => {
  await client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();
  await client.sendCommand(["ping"]);
  console.log("Redis:✅");
};

export { client };
export default redis_connection;
