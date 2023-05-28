import { Cache } from 'cache-manager';

export async function queryIfNotPrefetched<CachedResource>(
  resourceName: string,
  cacheManager: Cache,
  query: () => Promise<CachedResource>
): Promise<CachedResource> {
  let resource = await cacheManager.get<CachedResource>(resourceName);
  if (resource) return resource;

  resource = await query();
  await cacheManager.set(resourceName, resource);
  return resource;
}
