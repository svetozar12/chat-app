export const envs = {
  API_SCHEMA: process.env.NEXT_PUBLIC_API_SCHEMA || 'http',
  API_HOST: process.env.NEXT_PUBLIC_API_HOST || '127.0.0.1',
  API_PORT: process.env.NEXT_PUBLIC_API_PORT || '8080',
  API_VERSION: process.env.NEXT_PUBLIC_API_VERSION || 'v1',
};
