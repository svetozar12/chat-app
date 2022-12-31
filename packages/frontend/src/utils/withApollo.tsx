import { NextPage } from 'next';

import { ApolloClient, NormalizedCacheObject, InMemoryCache, ApolloProvider, createHttpLink, ApolloLink } from '@apollo/client';

import { IncomingMessage } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

export type ApolloClientContext = {
  req?: IncomingMessage & {
    cookies: NextApiRequestCookies;
  };
};

export const withApollo = (Comp: NextPage<any, any>) => (props: any) => {
  return (
    <ApolloProvider client={getApolloClient(undefined, props.apolloState)}>
      <Comp />
    </ApolloProvider>
  );
};

export const getApolloClient = (ctx?: ApolloClientContext, initialState?: NormalizedCacheObject) => {
  if (ctx && ctx.req) {
    const { req } = ctx;
    // Do something with the cookies here, maybe add a header for authentication
    req.cookies;
  }
  const gqlUrl = `${process.env.NEXT_PUBLIC_GQL_PROTOCOL}://${process.env.NEXT_PUBLIC_GQL_HOST}:${process.env.NEXT_PUBLIC_GQL_PORT}/graphql`;

  const httpLink = createHttpLink({
    uri: gqlUrl,
    fetch,
  });
  const cache = new InMemoryCache().restore(initialState || {});
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: httpLink,
    cache,
  });
};
