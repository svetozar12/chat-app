import 'dotenv/config';
import process from 'process';
import logger from '../../utils/logger';

const requiredEnvs: string[] = ['API_URL'];

requiredEnvs.forEach((env) => {
  if (!process.env[env]) {
    logger('error', `You have to add env : ${env} to your .env file`);
    process.exit(1);
  }
});
logger('log', 'Envs:✅');
