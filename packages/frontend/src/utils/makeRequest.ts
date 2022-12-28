import { client } from 'services/sdk';
import { request } from 'graphql-request';
import { DocumentNode } from '@apollo/client';
interface IMakeRequest {
  gqlQuery: string;
  path: string;
}
const gqlUrl = `${process.env.NEXT_PUBLIC_GQL_PROTOCOL}://${process.env.NEXT_PUBLIC_GQL_HOST}:${process.env.NEXT_PUBLIC_GQL_PORT}/graphql`;
const makeRequest = async <T>(args: IMakeRequest, resolverName: string): Promise<T> => {
  const { gqlQuery, path } = args;
  try {
    const res = await client(path, {
      data: {
        query: gqlQuery,
      },
    });

    if (res.data.data === null) throw Error(res.data.errors[0].message);
    return res.data.data[resolverName];
  } catch (error) {
    return error;
  }
};

export const gqlMakeRequest = async <TQuery, TArgs>(document: DocumentNode, variables: TArgs): Promise<TQuery> => {
  console.error('GQLMAKEREQUEST', variables, document);

  try {
    const data = await request<TQuery>({
      url: gqlUrl,
      document,
      variables: variables as any,
    });
    console.log('vankata', data);

    return data;
  } catch (error) {
    console.log(error, 'antivanka');

    return error;
  }
};

export default makeRequest;
