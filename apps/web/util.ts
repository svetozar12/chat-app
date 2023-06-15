export function getEnv(key: string) {
  console.log(publicConfig, 'GET ENV');
  if (typeof window === 'undefined') return process.env[key];
  return publicConfig[key];
}

export let publicConfig = {};

export function setPublicConfig(object: Record<any, string>) {
  publicConfig = { ...publicConfig, ...object };
  console.log(publicConfig);
}
