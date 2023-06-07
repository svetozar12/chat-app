export interface CommonEnvs {
  NEXT_PUBLIC_OAUTH_METHODS: string[];
  NEXT_PUBLIC_WS_SERVER_URL: string;
}

export type ClientEnvs = {
  NEXT_PUBLIC_API_URL: string;
};

export type ServerEnvs = object;

export const commonEnvs: CommonEnvs = {
  NEXT_PUBLIC_OAUTH_METHODS:
    process.env['NEXT_PUBLIC_OAUTH_METHODS']?.split(',') || [],
  NEXT_PUBLIC_WS_SERVER_URL:
    process.env['NEXT_PUBLIC_WS_SERVER_URL'] || 'ws://localhost:3000',
};

export const clientEnvs: ClientEnvs = {
  NEXT_PUBLIC_API_URL: process.env['NEXT_PUBLIC_API_URL'] || '',
};

export const serverEnvs: ServerEnvs = {};
