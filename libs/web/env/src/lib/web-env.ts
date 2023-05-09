export interface CommonEnvs {
  NEXT_PUBLIC_OAUTH_METHODS: string[];
  API_URL: string;
}

export type ClientEnvs = object;

export type ServerEnvs = object;

export const commonEnvs: CommonEnvs = {
  NEXT_PUBLIC_OAUTH_METHODS:
    process.env['NEXT_PUBLIC_OAUTH_METHODS']?.split(',') || [],
  API_URL: process.env['API_URL'] || '',
};

export const clientEnvs: ClientEnvs = {};

export const serverEnvs: ServerEnvs = {};
