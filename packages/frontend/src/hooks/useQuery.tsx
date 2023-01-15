import { useRef } from 'react';
import type { DocumentNode, QueryHookOptions } from '@apollo/client';
import { useQuery as useQueryT } from '@apollo/client';

export * from '@apollo/client/react';

// code from: // https://github.com/apollographql/apollo-client/issues/6603
// OVERWRITE DEFAULT useQuery from @apollo/client/react on version 3.x until
// https://github.com/apollographql/apollo-client/issues/7038 will be resolved!
export function useQuery<TData, TVariables>(query: DocumentNode, options?: QueryHookOptions<TData, TVariables>) {
  const cachedData = useRef<TData | undefined>(undefined);

  const queryResult = useQueryT<TData, TVariables>(query, options);

  if (
    queryResult.loading !== true &&
    queryResult.data !== undefined &&
    queryResult.data !== null &&
    // Check for empty object due to https://github.com/apollographql/apollo-client/issues/6876
    Object.keys(queryResult.data as any).length > 0
  ) {
    cachedData.current = queryResult.data;
  }

  return { ...queryResult, data: cachedData.current };
}
