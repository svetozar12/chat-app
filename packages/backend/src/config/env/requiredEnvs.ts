import 'dotenv/config';
import process from 'process';

const requiredEnvs: string[] = [
  'PORT',
  'WS_PORT',
  'CLIENT_URL',
  'MONGO_URL',
  'REDIS_URL',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
  'AVATAR_URL',
  'BLOB_CONNECTION_STRING',
  'DEBUG',
];

requiredEnvs.forEach((env) => {
  if (!process.env[env]) {
    console.error(`You have to add env : ${env} to your .env file`);
    process.exit(1);
  }
});
console.log('Envs:✅');
