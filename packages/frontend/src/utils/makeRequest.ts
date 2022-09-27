import { client } from 'services/sdk';

interface IMakeRequest {
  gqlQuery: string;
  path: string;
}

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

export default makeRequest;
