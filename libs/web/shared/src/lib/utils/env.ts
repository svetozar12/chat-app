type WebEnvsType = {
  NODE_ENV: 'development' | 'production' | 'test';
  NEXT_PUBLIC_API_HOST: string;
  NEXT_PUBLIC_API_PORT: string;
  NEXT_PUBLIC_API_SCHEME: string;
  NEXT_PUBLIC_OAUTH_METHODS: string[];
};

export const WEB_ENVS: WebEnvsType = {
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_API_HOST: process.env['NEXT_PUBLIC_API_HOST'] || 'localhost',
  NEXT_PUBLIC_API_PORT: process.env['NEXT_PUBLIC_API_PORT'] || '3000',
  NEXT_PUBLIC_API_SCHEME: process.env['NEXT_PUBLIC_API_SCHEME'] || 'http',
  NEXT_PUBLIC_OAUTH_METHODS:
    process.env['NEXT_PUBLIC_OAUTH_METHODS']?.split(',') || [],
};
