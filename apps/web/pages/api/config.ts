import { getEnv } from 'apps/web/util';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
const allowedEnvs = [
  'NEXT_PUBLIC_WS_SERVER_URL',
  'NEXT_PUBLIC_API_URL',
  'NEXT_PUBLIC_OAUTH_METHODS',
];
const handler = (_req: NextApiRequest, res: NextApiResponse): void => {
  checkEnvs();
  const config = {};
  for (const env of allowedEnvs) {
    config[env] = process.env[env];
  }
  res.status(200).json(config);
};

export default handler;

function checkEnvs() {
  if (getEnv('NODE_ENV') === 'production') return;
  const PUBLIC_ENV_PREFIX = 'NEXT_PUBLIC_';
  const ENV_DIR = `./apps/web/.env.${
    getEnv('NODE_ENV') === 'development' ? 'local' : getEnv('NODE_ENV')
  }`;

  fs.readFile(ENV_DIR, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data.split(/\r?\n/).forEach((line: string) => {
      const [env] = line.split('=');
      console.log(env);
      if (!allowedEnvs.includes(env) && env.includes(PUBLIC_ENV_PREFIX))
        throw new Error(
          `Envs in ${ENV_DIR} file doesn't match defined public envs`
        );
    });
  });
}
