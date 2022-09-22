import { GraphQLYogaError } from "@graphql-yoga/node";
import { instance } from "./sdk/index";

export enum Method {
  GET = "get",
  HEAD = "head",
  //   bellow methods have bodies
  DELETE = "delete",
  PUT = "put",
  POST = "post",
  PATCH = "patch",
}

const makeRequest = async <T>(
  method: Method,
  path: string = "",
  body?: Record<string, any>,
  headers?: Record<string, any>,
): Promise<T | GraphQLYogaError> => {
  try {
    if (method === "get" || method === "head") {
      const res = await instance[method](path, headers);
      return res.data;
    }
    const res = await instance[method](path, body, headers);
    return res.data;
  } catch (error: any) {
    return new GraphQLYogaError(error.response.data.Message);
  }
};

export default makeRequest;
