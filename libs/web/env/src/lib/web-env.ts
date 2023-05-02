export interface CommonEnvs {
  NEXT_PUBLIC_OAUTH_METHODS: string[];
}

export type ClientEnvs = object;

export type ServerEnvs = object;

export const commonEnvs: CommonEnvs = {
  NEXT_PUBLIC_OAUTH_METHODS:
    process.env['NEXT_PUBLIC_OAUTH_METHODS']?.split(',') || [],
};

export const clientEnvs: ClientEnvs = {};

export const serverEnvs: ServerEnvs = {};
