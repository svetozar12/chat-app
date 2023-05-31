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

type PaginatedResponse = { page: number; limit: number; total: number };

export function formatPaginatedResponse<Resouce>(
  resourceName: string,
  data: Resouce,
  pagination: PaginatedResponse = { limit: 10, page: 1, total: 0 }
) {
  // paginatedObject[]
  return { pagination, [resourceName]: data };
}
