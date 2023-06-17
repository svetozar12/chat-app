import { NextApiRequest, NextApiResponse } from 'next';
const allowedEnvs = [
  'NEXT_PUBLIC_WS_SERVER_URL',
  'NEXT_PUBLIC_API_URL',
  'NEXT_PUBLIC_OAUTH_METHODS',
];
const handler = (_req: NextApiRequest, res: NextApiResponse): void => {
  try {
    checkEnvs();
    const config = {};
    for (const env of allowedEnvs) {
      config[env] = process.env[env];
    }
    res.status(200).json(config);
  } catch (error) {
    res.status(401).json({ errorMessage: error.message });
  }
};

export default handler;

function checkEnvs() {
  const PUBLIC_ENV_PREFIX = 'NEXT_PUBLIC_';
  for (const env in process.env) {
    if (!allowedEnvs.includes(env) && env.includes(PUBLIC_ENV_PREFIX))
      return console.error(
        '\x1b[31m',
        `Env: ${env} isn't allowed public env(please add it to allowedEnvs)`
      );
  }
}
