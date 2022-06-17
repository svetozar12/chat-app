import blob_connection from "./blob_config";
import mongo_connection from "./mongo_config";
import redis_connection from "./redis_config";

const config_init = () => {
  // blob_connection();
  mongo_connection();
  redis_connection();
};

export default config_init;
