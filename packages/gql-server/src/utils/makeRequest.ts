import { GraphQLYogaError } from '@graphql-yoga/node';
import { instance } from './sdk/index';

export enum Method {
  GET = 'get',
  HEAD = 'head',
  //   bellow methods have bodies
  DELETE = 'delete',
  PUT = 'put',
  POST = 'post',
  PATCH = 'patch',
}

const makeRequest = async <T>(
  method: Method,
  path = '',
  body?: Record<string, any>,
  options?: Record<string, any>,
): Promise<T | { __typename: 'Error'; message: string }> => {
  try {
    if (method === 'get' || method === 'head' || method === 'delete') {
      const res = await instance[method](path, options);
      return res.data;
    }
    const res = await instance[method](path, body, options);
    return res.data;
  } catch (error: any) {
    return { __typename: 'Error', message: error.response.data.Message };
  }
};

export default makeRequest;
