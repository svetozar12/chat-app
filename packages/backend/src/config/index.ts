import './env/requiredEnvs';
import '../services/webSocket/wsConnection';

// import blob_connection from './nosql/blob_config';
import mongo_connection from './nosql/mongo_config';
import redis_connection from './nosql/redis_config';

const configInit = () => {
  // blob_connection();
  mongo_connection();
  redis_connection();
};

export default configInit();
