import './env/requiredEnvs';
import '../services/webSocket/wsConnection';
import mongo_connection from './nosql/mongo_config';
import redis_connection from './nosql/redis_config';

const configInit = () => {
  mongo_connection();
  redis_connection();
};

export default configInit();
