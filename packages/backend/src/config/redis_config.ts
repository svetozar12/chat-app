import { createClient } from "redis";

const client = createClient();
const redis_connection = async () => {
  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();
  const value = await client.sendCommand(["ping"]);
  console.log(value, "Connection with redis");
};

export { client };
export default redis_connection;
