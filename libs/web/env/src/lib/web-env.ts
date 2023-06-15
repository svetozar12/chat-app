import getConfig from 'next/config';
export interface CommonEnvs {
  OAUTH_METHODS: string[];
  WS_SERVER_URL: string;
  API_URL: string;
}
console.log(getConfig());
const { publicRuntimeConfig } = getConfig() as {
  publicRuntimeConfig: CommonEnvs;
};

export type ServerEnvs = object;

export const commonEnvs: CommonEnvs = {
  OAUTH_METHODS:
    (publicRuntimeConfig.OAUTH_METHODS as unknown as string)?.split(',') || [],
  WS_SERVER_URL: publicRuntimeConfig['WS_SERVER_URL'] || 'ws://localhost:3000',
  API_URL: publicRuntimeConfig['API_URL'] || '',
};

export const serverEnvs: ServerEnvs = {};
