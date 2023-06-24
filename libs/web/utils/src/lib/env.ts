export function getEnv(key: string) {
  if (typeof window === 'undefined') return process.env[key];
  return publicConfig[key];
}

export let publicConfig: Record<string, any> = {};

export function setPublicConfig(object: Record<any, string>) {
  publicConfig = { ...publicConfig, ...object };
}
