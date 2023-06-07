export interface CommonEnvs {
  NEXT_PUBLIC_OAUTH_METHODS: string[];
  API_URL: string;
  NEXT_PUBLIC_WS_SERVER_URL: string;
}

export type ClientEnvs = object;

export type ServerEnvs = object;

export const commonEnvs: CommonEnvs = {
  NEXT_PUBLIC_OAUTH_METHODS:
    process.env['NEXT_PUBLIC_OAUTH_METHODS']?.split(',') || [],
  API_URL: process.env['API_URL'] || '',
  NEXT_PUBLIC_WS_SERVER_URL:
    process.env['NEXT_PUBLIC_WS_SERVER_URL'] || 'ws://localhost:3000',
};

export const clientEnvs: ClientEnvs = {};

export const serverEnvs: ServerEnvs = {};
