import { client } from 'services/sdk';

interface IMakeRequest {
  gqlQuery: string;
  path: string;
}

const makeRequest = async <T>(args: IMakeRequest): Promise<T> => {
  const { gqlQuery, path } = args;
  try {
    const res = await client(path, {
      data: {
        query: gqlQuery,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export default makeRequest;
