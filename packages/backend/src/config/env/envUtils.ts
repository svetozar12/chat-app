import 'dotenv/config';

const getEnv = (env: string): string => {
  return process.env[env] as string;
};

export { getEnv };
