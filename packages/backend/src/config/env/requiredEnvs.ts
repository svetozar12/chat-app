import 'dotenv/config';
import process from 'process';

const requiredEnvs: string[] = [
  'PORT',
  'WS_PORT',
  'CLIENT_URL',
  'DB_NAME',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
  'AVATAR_URL',
  'BLOB_CONNECTION_STRING',
];

requiredEnvs.forEach((env) => {
  if (!process.env[env]) {
    console.error(`You have to add env : ${env} to your .env file`);
    process.exit(1);
  }
});
console.log('Envs:✅');
